import Link from "next/link";
import React from "react";
import RemoveFromCartButton from "@/components/RemoveFromCartButton";
import {TCartProduct} from "@/utils";
import {Badge} from "@/components/ui/badge";

export default function CartProduct({ product }: { product: TCartProduct }) {
  const { name, product_id, id, quantity, total, price, description } = product;
  return (
    <div className="flex flex-col  shadow-sm bg-gray-800 text-white">
      <div className="flex items-center justify-center min-w-[157px] min-h-[180px] bg-slate-300 relative">
        {/*<Image ...></Image>*/}
          <Badge variant='destructive'
                 className='absolute top-1.5 right-1.5 text-xs'>quantity: {quantity}</Badge>

      </div>
        <div className="p-4">
            <Link href={`/products/${product_id}`}>
                <p className="line-clamp-1 text-[18px] font-bold capitalize ">{name}</p>
            </Link>
            <p className="line-clamp-2 text-sm">{description}</p>
            <div className="flex items-center gap-2 text-amber-600">
                <span className="text-sm">Rs:</span>
                <span className='text-xl'>{price}</span>
            </div>
            <div className="flex items-center gap-2 text-amber-600">
                <span className="text-sm">Total Rs:</span>
                <span className='text-xl'>{total}</span>
            </div>
            <RemoveFromCartButton id={id}/>
        </div>
    </div>
  );
}
