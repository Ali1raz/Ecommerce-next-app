import Link from "next/link";
import React from "react";
import RemoveFromCartButton from "@/components/RemoveFromCartButton";
import { Button } from "@/components/ui/button";

type CartProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
};

export default function CartProduct({ product }: { product: CartProduct }) {
  const { name, id, quantity, total, price, description } = product;
  return (
    <div className="flex flex-col  shadow-sm bg-gray-800 text-white">
      <div className="flex items-center justify-center min-w-[157px] min-h-[180px] bg-slate-300 relative">
        {/*<Image ...></Image>*/}
        <span className="absolute top-1.5 right-1.5 py-1 px-4 text-xs drop-shadow-sm rounded-full bg-red-500 text-white">
          {quantity}
        </span>
      </div>
      <div className="p-4">
        <p className="line-clamp-1 text-[18px] font-bold capitalize ">{name}</p>
        <p className="line-clamp-2 text-sm">{description}</p>
        <p className="text-amber-600 font-bold flex gap-1 items-center mt-1">
          <span className="text-xs">Rs</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between items-center mt-3">
            <Button variant='secondary' asChild className=' px-5 rounded-none py-1'>
                <Link href={`/products/${id}`}>View</Link>
            </Button>
          <RemoveFromCartButton id={id} />
        </div>
        <div className="flex items-center gap-2 mt-3 text-amber-600">
          <span className="text-sm">Total Rs:</span>
          <span>{total}</span>
        </div>
      </div>
    </div>
  );
}
