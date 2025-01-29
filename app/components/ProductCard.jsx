import React from "react";
import Image from "next/image";
import ProductButton from "./ProductButton";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({product}) {
    const {name, id} = product;


    return (
        <div className="flex flex-row sm:flex-col  shadow-sm bg-gray-800">
            <div className="flex items-center justify-center min-w-[157px] min-h-[180px] bg-white">
                <p className='text-black'>{name}</p>
            </div>
        </div>
    )
}