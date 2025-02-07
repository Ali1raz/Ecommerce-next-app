import { getUserbyId} from "@/app/actions/actions";
import ProductsList from "@/components/ProductsList";
import {prisma} from "@/lib/prisma";

export default async function UserPage({params}: {params: Promise<{userId: string}>}) {
    const userId = (await params).userId;
    // const products = await get_all_products(userId);
    const products = await prisma.product.findMany({where: {user_id : userId}});

    const user =await getUserbyId(userId);
    console.log('==>', userId, user?.name);
    products.forEach(p => console.log('--', p.user_id))
    return (
        <div>
            <h1>User Details</h1>
            {products.length !== 0 ? (<ProductsList data={products}/>): (
                <h1 className='text-center text-2xl mt-8'>No products .</h1>
            )}
        </div>
    )
}