import {get_total_bill} from "@/app/actions/actions";
import Link from "next/link";

export default async function CartBillPage() {
    let grand_total: number = 0;
    let grand_quantity: number = 0;
    const cartItems = await get_total_bill()

    return (
        <div className=" my-5 max-w-md mx-auto font-mono bg-slate-200 text-slate-800">
            <div className='px-8 bg-slate-100 py-8'>
                {cartItems?.map((item) => {
                    grand_quantity += item?.total_quantity;
                    grand_total += (item?.price_per_item * item?.total_quantity);
                    return (
                        <div key={item.id} className='px-6 '>
                            <div className='flex items-center justify-between'>
                                <span className='line-clamp-1'>Product Name:</span>
                                <span className='line-clamp-1 hover:text-blue-700 text-end'><Link
                                    href={`/products/${item.id}`}>{item.name}</Link></span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span>Items:</span>
                                <span className=''>{item.total_quantity}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span>Price Per Item:</span>
                                <span className='line-clamp-1 text-end'>Rs {item.price_per_item}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span>Total price</span>
                                <span
                                    className='line-clamp-1 text-end'>Rs {(item?.price_per_item * item?.total_quantity)}</span>
                            </div>
                            <div className='h-1 w-full bg-slate-700 my-2 rounded-2xl'></div>
                        </div>
                    )
                })}

                <div className='mt-6 py-1 px-6 bg-slate-300 text-blue-900'>
                    <div className='flex items-center justify-between'>
                        <span>Grand Total Items</span>
                        <span className='line-clamp-1 font-bold text-end'>{grand_quantity}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                        <span>Grand Total:</span>
                        <span className='line-clamp-1 font-bold text-end'>Rs {grand_total}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}