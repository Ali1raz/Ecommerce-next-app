import {getUserbyId} from "@/app/actions/actions";
import ProductsList from "@/components/ProductsList";
import {prisma} from "@/lib/prisma";
import NotFound from "@/app/user/not-found";
import UserAvatar from "@/components/UserAvatar";

export default async function UserPage({params}: {params: Promise<{userId: string}>}) {
    const userId = (await params).userId;
    const user = await getUserbyId(userId);
    if (!user) {return NotFound()}
    const products = await prisma.product.findMany({where: {user_id : userId}});

    return (
        <div className='container w-full mx-auto'>
            <div className='p-2 flex items-start gap-3 border'>
                <UserAvatar user={user} size={60} />
                <div className='flex-1'>
                    <h1 className='text-gray-800 text-xl font-bold tracking-wide'>{user?.name}</h1>
                    <p>Total Products: <span className='text-gray-600'>{products.length}</span></p>
                </div>
            </div>
            <div className='h-1 w-full bg-gray-600 my-3 '></div>
            <div className='container py-4 max-w-6xl mx-auto'>
                {products.length !== 0 ? (<ProductsList data={products}/>): (
                    <h1 className='text-center text-2xl mt-8'>No products by the user.</h1>
                )}
            </div>
        </div>
    )
}