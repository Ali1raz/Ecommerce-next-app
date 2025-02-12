import AddToCartButton from "./AddToCartButton";
import {TCategory, TProductProps} from "@/utils";
import {get_categories, getUserbyId} from "@/app/actions/actions";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {User2Icon} from "lucide-react";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function ProductDetails({product}: { product: TProductProps }) {
    const {id, user_id, name, description, price, stock_quantity, rating} = product;
    const product_owner = await getUserbyId(user_id);
    const {isAuthenticated} = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    const categories:TCategory[] = await get_categories(id);
    return (
        <div className='mx-5'>
            <div className='flex flex-col sm:flex-row'>
                <div className='flex-1 bg-gray-400 h-auto min-h-56 p-4 flex items-center justify-center'>
                    {/*<Image className='mx-auto ' src={`/${image}`} alt={name} width={200} height={200}/>*/}
                    placeholder for product
                </div>
                <div className='mt-2 sm:mt-0 sm:ml-2 flex-1'>
                    <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
                    <p className='text-neutral-600'>{description}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className='flex items-center justify-between my-2 max-w-md mx-auto'>
                    <p className="text-amber-600">Rs <span className='font-bold text-xl'>{(price).toFixed()}</span></p>
                    <p className=''>Rating: <span className='text-xl font-bold'>{rating}</span></p>
                </div>
                <div className='p-2 gap-3 flex items-center border-y-2 mb-2'>
                    <Link href={`/user/${user_id}`}>
                        <Avatar>
                            <AvatarImage src={product_owner?.avatar} alt='user'
                                         className='rounded-full'
                                         width={15} height={15}/>
                            <AvatarFallback><User2Icon/></AvatarFallback>
                        </Avatar>
                    </Link>
                    <Link className='hover:underline focus:underline focus-within:underline underline-offset-2'
                          href={`/user/${user_id}`}>{product_owner?.name}</Link>
                </div>
                <AddToCartButton productId={id} stock_quantity={stock_quantity} isLoggedIn={isLoggedIn}/>
            </div>

            <div className='mt-4'>
                <h3 className='text-2xl text-amber-500'>Categories:</h3>
                <div className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-2">
                    {categories.map((category) => (
                        <Badge variant='secondary' className='cursor-pointer hover:bg-gray-200 font-thin text-sm'
                               key={category.id}><span className='line-clamp-1'>{category.name}</span></Badge>
                    ))}
                </div>
            </div>
        </div>
    )
}