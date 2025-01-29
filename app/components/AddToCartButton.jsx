import Link from "next/link";

export default function AddToCartButton({productId}) {

    return (
        <Link href={`/`} className='w-fit'>
            <button
                className='bg-yellow-500 text-white px-4 py-1 mt-1 hover:scale-105'
            >
                Add to Cart
            </button>
        </Link>
    )
}