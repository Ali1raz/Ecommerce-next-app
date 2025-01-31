import Form from "next/form";
import {add_new_product} from "@/app/actions/actions";

export default function AddProductForm() {
    return (
        <Form action={add_new_product}
              className="flex flex-col gap-y-3  w-[300px] mx-auto p-4 text-black">
            <div className="flex flex-col w-full gap-2">
                <label htmlFor="product_name" className='text-white '>Product Name</label>
                <input name="product_name" id="product_name" type="text" placeholder="T-shirt"
                       className='px-3 py-1 border-blue-500 border-b-[3px]'/>
            </div>
            <div className="flex flex-col w-full gap-2">
                <label htmlFor="product_description" className='text-white '>Product Description</label>
                <textarea name="product_description" id='product_description' placeholder="size, color, use ..."
                          className='px-3 py-1  border-blue-500 border-b-[3px]'/>
            </div>
            <div className="flex flex-col w-full gap-2">
                <label htmlFor="categories" className='text-white '>Product Categories</label>
                <input name="categories" id='categories' type="text" placeholder="fashion, clothing, kids ..."
                       className='px-3 py-1 border-blue-500 border-b-[3px]'/>
            </div>
            <div className="flex flex-col w-full gap-2 ">
                <label htmlFor="price" className='text-white '>Price Rs</label>
                <input name='price' id='price' type="number" placeholder="50"
                       className='px-3 py-1 border-blue-500 border-b-[3px]'/>
            </div>
            <div className='flex flex-col w-full gap-2 '>
                <label htmlFor="stock_quantity" className='text-white '>Stock Quantity</label>
                <input name='stock_quantity' id='stock_quantity' type="number" placeholder="Stock Quantity"
                       className='px-3 py-1 border-blue-500 border-b-[3px]'/>
            </div>
            <button type='submit' className='mt-3 w-full text-white bg-blue-800 py-1 px-4'>Add Product</button>
        </Form>
    )
}