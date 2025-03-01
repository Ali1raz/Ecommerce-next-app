"use server";

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {generateSlug} from "@/utils";

export async function find_or_save_user_to_db() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if (!user || !user.id) {
        console.log("login first")
        redirect("/api/auth/login");
    } else {
        return prisma.user.upsert({
            where: {email: user?.email || ''},
            update: {
                name: `${user.given_name ?? ""} ${user.family_name ?? ""}`.trim(),
                email: user.email ?? "",
                avatar: user.picture ?? ""
            },
            create: {
                id: user.id,
                name: `${user.given_name ?? ""} ${user.family_name ?? ""}`.trim(),
                email: user.email ?? "",
                avatar: user.picture ?? ""
            },
        });
    }
}

export async function getUserbyId(id: string) {
    return (await prisma.user.findUnique({
        where: {id},
        select: {id: true,name: true, avatar: true}
    }))
}

export async function get_all_products(query?: string, category_slug?: string) {
    if (query || category_slug) {
        return  prisma.product.findMany({
            where: {
                OR: [
                    {name: {contains: query, mode: 'insensitive'},},
                    {description: {contains: query, mode: 'insensitive'},},
                    {categories: {some: {category: {slug: {contains: query ?? category_slug, mode: 'insensitive'}}}}}
                ],
            },
            orderBy: {created_at: "desc",},
        });
    }

    return prisma.product.findMany({
            where: {stock_quantity: {gt: 0,}},
            orderBy: {created_at: "desc",},
        });
}

export async function get_product(product_id: string) {
    return prisma.product.findUnique({
        where: {id: product_id},
    });
}

export async function add_new_product(
    product_name: string,
    product_description: string,
    price: string,
    categories: string,
    stock_quantity: string
) {
    try {
        // authorization check
        const user = await find_or_save_user_to_db();
        const category_names = categories.split(',').map(category => category.trim()).filter(Boolean);
        const category_slugs = category_names.map(c => generateSlug(c));

        await prisma.product.create({
            data: {
                name: product_name,
                description: product_description,
                rating: 0,
                price: parseFloat(price),
                stock_quantity: parseInt(stock_quantity),
                user_id: user?.id,

                categories: {
                    create: await Promise.all(
                        category_slugs.map(async (slug, index) => {
                            const category = await prisma.category.upsert({
                                where: {slug},
                                update: {},
                                create: {name: category_names[index], slug},
                            });
                            return {category: {connect: {id: category.id}}}
                        })
                    )
                }
            },
        });
        return {success: true, message: "Product added successfully."};
    } catch (error) {
        return {success: false, message: 'Could not add product'};
    }
}

export async function get_categories(product_id?: string) {
    let categories;
    if (!product_id) {
        categories = await prisma.category.findMany({
            select: {id: true, name: true, slug: true},
        });
    } else {
        const pc = await prisma.productCategoryLink.findMany({
            where: {
                product_id: product_id,
            },
            select: {
                category: {
                    select: {id: true, name: true, slug: true},
                }
            }
        })
        categories = pc.map(link => link.category)
    }
    return categories;
}

export async function delete_product(id: string) {
    try {
        await prisma.product.delete({
            where: {id},
        });
        revalidatePath('/');
        await prisma.category.deleteMany({ // delete categories
            where: {products: {none: {}}},
        })
        return {success: true, message: 'Product deleted successfully.'}

    } catch (error) {
        return {success: false, message: 'Could not delete product...!'};
    }

}

export async function add_to_cart(id: string, quantity: number = 1) {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        return redirect("/api/auth/login");
    }

    const user = await getUser();
    if (!user || !user.id) {
        return { success: false, message: "invalid user data." };
    }

    try {
        let cart = await prisma.cart.findUnique({ where: { user_id: user.id } });

        if (!cart) {
            console.log("creating a new cart");
            cart = await prisma.cart.create({
                data: { user_id: user.id },
            });
        }

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cart_id_product_id: {
                    cart_id: cart.id,
                    product_id: id,
                },
            },
        });

        const product = await prisma.product.findUnique({
            where: { id },
            select: { stock_quantity: true },
        });
        if (!product) {
            return { success: false, message: "Product not found" };
        }
        console.log("Product stock available:", product.stock_quantity);

        if (quantity > product.stock_quantity) {
            return { success: false, message: "Not enough stock" };
        }

        if (!existingItem) {
            console.log("Adding new item to cart.");
            await prisma.cartItem.create({
                data: {
                    cart_id: cart.id,
                    product_id: id,
                    quantity,
                },
            });
        } else {
            console.log("existing item");
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }

        console.log("added to cart.");
        return { success: true, message: "Added to cart." };
    } catch (error) {
        return { success: false, message: error.message || "An error occurred" };
    }
}

export async function remove_product_from_cart(id: string) {
    try {
        await prisma.cartItem.delete({where: {id}});
        return {success: true};
    } catch (error) {
        console.log("Error in remoeving product from cart:", error);
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
                    include: {product: true},
                },
            },
        });

        if (!cart) {
            return {items: []};
        }
        return cart.items?.map((item) => ({
            id: item.id,
            product_id: item.product.id,
            name: item.product.name,
            description: item.product.description,
            price: item.product.price,
            quantity: item.quantity,
            total: item.quantity * item.product.price,
        }));
    } catch (error) {
        console.log("Error getting cart items: ", error);
        return [];
    }
}

export async function get_total_bill() {
    try {
        const cartItemsSummary = await prisma.cartItem.groupBy({
            by: ["product_id"],
            _sum: {quantity: true},
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
                    },
                });
                return {
                    id: item.product_id,
                    name: product?.name,
                    price_per_item: product?.price,
                    total_quantity: item._sum.quantity,
                };
            })
        );

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

        console.log("finding cart total bill ");
        return cart_with_product_details;
    } catch (error) {
        console.log("error getting total bill", error);
    }
}
