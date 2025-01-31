'use client'

import Form from "next/form";
import {useActionState} from "react";
import {createProduct, FormState} from "@/app/products/actions";


export default function AddProductForm() {
    const initialState: FormState = {
        errors: {}
    }

    const [state, formAction, pending] = useActionState(createProduct, initialState)

    return (
        <Form action={formAction}
              className="flex flex-col gap-y-3  w-[300px] mx-auto p-4 text-black">
            <div className="flex flex-col w-full gap-2">
                <div>
                    <label htmlFor="product_name" className='text-white '>Product Name</label>
                    {state.errors.product_name && (
                        <p className='text-red-500 text-[0.8rem]'>{state.errors.product_name}</p>)}
                </div>
                <input name="product_name" id="product_name" type="text" placeholder="T-shirt"
                       className='px-3 py-1 border-blue-500 border-b-[3px]'/>
            </div>
            <div className="flex flex-col w-full gap-2">
                <div>
                    <label htmlFor="product_description" className='text-white '>Product Description</label>
                    {state.errors.product_description && (
                        <p className='text-red-500 text-[0.8rem]'>{state.errors.product_description}</p>)}
                </div>
                <textarea name="product_description" id='product_description' placeholder="size, color, use ..."
                          className='px-3 py-1  border-blue-500 border-b-[3px]'/>
            </div>
            <div className="flex flex-col w-full gap-2">
                <label htmlFor="categories" className='text-white '>Product Categories</label>
                {state.errors.categories && (<p className='text-red-500 text-[0.8rem]'>{state.errors.categories}</p>)}
                <input name="categories" id='categories' type="text" placeholder="fashion, clothing, kids ..."
                       className='px-3 py-1 border-blue-500 border-b-[3px]'/>
            </div>
            <div className="flex flex-col w-full gap-2 ">
                <div>
                    <label htmlFor="price" className='text-white '>Price in Rs</label>
                    {state.errors.price && (<p className='text-red-500 text-[0.8rem]'>{state.errors.price}</p>)}
                </div>
                <input name='price' id='price' type="number" placeholder="50" min={1}
                       className='px-3 py-1 border-blue-500 border-b-[3px]'/>
            </div>
            <div className='flex flex-col w-full gap-2 '>
                <div>
                    <label htmlFor="stock_quantity" className='text-white '>Stock Quantity</label>
                    {state.errors.stock_quantity && (
                        <p className='text-red-500 text-[0.8rem]'>{state.errors.stock_quantity}</p>)}
                </div>
                <input name='stock_quantity' id='stock_quantity' min={1} type="number" placeholder="Stock Quantity"
                       className='px-3 py-1 border-blue-500 border-b-[3px]'/>
            </div>
            <button
                type='submit'
                disabled={pending}
                className='mt-3 w-full text-white bg-blue-800 py-1 px-4 disabled:bg-gray-500'
            >Add Product
            </button>
        </Form>
    )
}