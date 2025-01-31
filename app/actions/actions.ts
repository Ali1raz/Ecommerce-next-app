'use server'

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";

export async function findOrCreateUser() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user?.email || !user?.given_name) {
        console.log("Invalid user session. Missing required fields.");
    }
    try {
        let existingUser = await prisma.user.findUnique({
            where: {email: user?.email}
        })

        if (!existingUser) {
            console.error("new user created ...");
            existingUser = await prisma.user.create({
                data: {
                    id: user.id,
                    name: user.given_name,
                    email: user.email,
                    avatar: user.picture || '',
                }
            })
        } else {
            console.log("User already exists in db");
        }
        return existingUser;
    } catch (error) {
        console.log('failed to add user to db: ', error);
    }
}


export async function get_all_products(query?: string) {
    let a = await prisma.product.findMany({
        where: {
            stock_quantity: {
                gt: 0
            }
        },
        orderBy: {
            created_at: "desc"
        }
    });

    if (query) {
        a = await prisma.product.findMany({
            where: {
                OR: [
                    {name: {contains: query}},
                    {description: {contains: query}},
                ]
            }
        });
        console.log('searched for:', query);
    }

    return a
}

export async function add_new_product(
    product_name: string,
    product_description: string,
    price: string,
    categories: string,
    stock_quantity: string
) {

    // authentication check
    const {isAuthenticated} = getKindeServerSession();
    if (!(await isAuthenticated())) {
        redirect('api/auth/login');
    }

    await prisma.product.create({
        data: {
            name: product_name,
            description: product_description,
            rating: 0,
            price: parseFloat(price),
            stock_quantity: parseInt(stock_quantity),
        }
    })
    redirect("/")
}

export async function add_to_cart(id: string, quantity: number = 1) {
    const {isAuthenticated, getUser} = getKindeServerSession();
    if (!(await isAuthenticated())) {
        redirect('api/auth/login');
    }
    const user = await getUser();

    try {
        let cart = await prisma.cart.findUnique({where: {user_id: user.id}});
        console.log('finding cart for: ', user.given_name);
        if (!cart) {
            console.log('creating new cart')
            cart = await prisma.cart.create({
                data: {
                    user_id: user.id,
                }
            })
        }

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cart_id_product_id: {
                    cart_id: cart.id,
                    product_id: id
                }
            }
        });

        const existing_stock: { stock_quantity: number } = await prisma.product.findUnique({
            where: {
                id: id
            },
            select: {
                stock_quantity: true
            }
        })
        if (quantity <= existing_stock.stock_quantity) {
            // await prisma.product.update({
            //     where: {
            //         id: id,
            //     },
            //     data: {
            //         stock_quantity: {
            //             decrement: quantity,
            //         }
            //     },
            // })
            console.log('existing stock was enough as u demanded ...!');
        } else {
            console.log('existing stock is < u demanded ...!');
            return {success: false};
        }

        if (!existingItem) {
            await prisma.cartItem.create({
                data: {
                    cart_id: cart.id,
                    product_id: id,
                    quantity,
                }
            })
        } else {
            await prisma.cartItem.update({
                where: {
                    id: existingItem.id
                },
                data: {
                    quantity: existingItem.quantity + quantity,
                }
            })
        }
        return {success: true};
    } catch (error) {
        console.log(error);
        return {success: false};
    }
}

export async function remove_product_from_cart(id: string) {
    try {
        await prisma.cartItem.delete({where: {id}});
        return {success: true};
    } catch (error) {
        console.log('Error in remoeving product from cart:', error);
        return {success: false};
    }
}

export async function get_cart_items() {
    const {getUser} = getKindeServerSession();

    const user = await getUser();
    try {
        const cart = await prisma.cart.findUnique({
            where: {user_id: user.id},
            include: {
                items: {
                    include: {product: true}
                }
            }
        })

        if (!cart) {
            return {items: []}
        }
        return cart.items?.map(item => ({
            id: item.id,
            product_id: item.product.id,
            name: item.product.name,
            description: item.product.description,
            price: item.product.price,
            quantity: item.quantity,
            total: item.quantity * item.product.price,
        }))
    } catch (error) {
        console.log('Error getting cart items: ', error)
        return [];
    }
}

export async function get_total_bill() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    try {
        const cartItemsSummary = await prisma.cartItem.groupBy({
            by: ['product_id'],
            _sum: {quantity: true}
        });

        const cart_with_product_details = await Promise.all(
            cartItemsSummary.map(async (item) => {
                const product = await prisma.product.findUnique({
                    where: {
                        id: item.product_id,
                    },
                    select: {
                        name: true,
                        price: true,
                    }
                });
                return {
                    id: item.product_id,
                    name: product?.name,
                    price_per_item: product?.price,
                    total_quantity: item._sum.quantity
                }
            })
        )

        // const cartItems = await prisma.cart.findMany({
        //     where: {
        //         user_id: user.id
        //     },
        //     include: {
        //         items: {
        //             select: {
        //                 quantity: true,
        //             },
        //             // include: {
        //             //     product: {
        //             //         select: {
        //             //             name: true,
        //             //         }
        //             //     }
        //             // }
        //         }
        //     }
        // })\


        console.log('finding cart total bill ');
        return cart_with_product_details;
    } catch (error) {
        console.log("error getting total bill", error);
    }
}