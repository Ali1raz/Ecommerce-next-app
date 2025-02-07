import AddToCartButton from "./AddToCartButton";
import {TProductProps} from "@/utils";
import {getUserbyId} from "@/app/actions/actions";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";


export default async function ProductDetails({product}: { product: TProductProps }) {
    const {id, user_id, name, description, price, stock_quantity, rating} = product;
    const product_owner = await getUserbyId(user_id);

    return (
        <div className='max-w-2xl sm:mx-auto mx-5'>
            <div className='w-full bg-gray-400 h-auto min-h-40 p-4 flex items-center justify-center'>
                {/*<Image className='mx-auto ' src={`/${image}`} alt={name} width={200} height={200}/>*/}
            </div>
            <div className="mt-6">
                <p className='text-neutral-600'>{description}</p>
                <p>{name}</p>
                <div className='border p-2 gap-3 text-gray-900 border-gray-700 flex items-center'>
                    <Link href={`/user/${user_id}`}>
                        <Avatar>
                        <AvatarImage src={product_owner?.avatar || ''} alt='user'
                                     className='rounded-full '
                                     width={15} height={15}/>
                    </Avatar>
                    </Link>
                    <p><Link href={`/user/${user_id}`}>{product_owner?.name}</Link></p>
                </div>
                <p className="font-bold mt-2">Rs {(price).toFixed(2)}</p>
                <div className='my-1 flex items-center justify-start gap-2'>
                    <p className='text-bold'>Rating:</p><span>{rating}</span>
                    {/*<Image className='inline' src={`/images/ratings/rating-${(stars * 10)}.png`}*/}
                    {/*       alt={`alt-${(stars * 10)}`} width={100} height={10}/>*/}
                    {/*<p><span>{stars}</span> of <span>{count}</span> users</p>*/}
                </div>

                <AddToCartButton productId={id} stock_quantity={stock_quantity}/>
            </div>
            <div className='mt-4 '>
                <h3>Tags:</h3>
                {/*<div className="mt-3 flex items-center justify-start gap-3">*/}

                {/*    {keywords.map((kw, index) => {*/}
                {/*        return <button*/}
                {/*            className='bg-amber-300 text-black  hover:scale-105 transition-all duration-100 py-1 px-2 rounded-2xl'*/}
                {/*            key={index}>{kw}</button>*/}
                {/*    })}*/}
                {/*</div>*/}
            </div>
        </div>
    )
}