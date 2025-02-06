"use client";

import Form from "next/form";
import { useActionState } from "react";
import { createProduct, FormState } from "@/app/products/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function AddProductForm() {
  const initialState: FormState = {
    errors: {},
  };

  const [state, formAction, pending] = useActionState(
    createProduct,
    initialState
  );

  return (
    <Form
      action={formAction}
      className="flex flex-col gap-y-3  w-[300px] mx-auto p-4 text-black"
    >
      <div className="flex flex-col w-full gap-2">
        <div>
          <Label htmlFor="product_name" className=" ">
            Product Name
          </Label>
          {state?.errors.product_name && (
            <p className="text-red-500 text-[0.8rem]">
              {state.errors.product_name}
            </p>
          )}
        </div>
        <Input
          name="product_name"
          id="product_name"
          type="text"
          placeholder="T-shirt"
          className="px-3 py-1 border-blue-500 border-b-[3px]"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <div>
          <Label htmlFor="product_description" className=" ">
            Product Description
          </Label>
          {state?.errors.product_description && (
            <p className="text-red-500 text-[0.8rem]">
              {state.errors.product_description}
            </p>
          )}
        </div>
        <textarea
          name="product_description"
          id="product_description"
          placeholder="size, color, use ..."
          className="px-3 py-1  border-blue-500 border-b-[3px]"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <label htmlFor="categories" className="">
          Product Categories
        </label>
        {state?.errors.categories && (
          <p className="text-red-500 text-[0.8rem]">
            {state.errors.categories}
          </p>
        )}
        <Input
          name="categories"
          id="categories"
          type="text"
          placeholder="fashion, clothing, kids ..."
          className="px-3 py-1 border-blue-500 border-b-[3px]"
        />
      </div>
      <div className="flex flex-col w-full gap-2 ">
        <div>
          <Label htmlFor="price" className="">
            Price in Rs
          </Label>
          {state?.errors.price && (
            <p className="text-red-500 text-[0.8rem]">{state.errors.price}</p>
          )}
        </div>
        <Input
          name="price"
          id="price"
          type="number"
          placeholder="50"
          min={1}
          className="px-3 py-1 border-blue-500 border-b-[3px]"
        />
      </div>
      <div className="flex flex-col w-full gap-2 ">
        <div>
          <Label htmlFor="stock_quantity" className=" ">
            Stock Quantity
          </Label>
          {state?.errors.stock_quantity && (
            <p className="text-red-500 text-[0.8rem]">
              {state.errors.stock_quantity}
            </p>
          )}
        </div>
        <Input
          name="stock_quantity"
          id="stock_quantity"
          min={1}
          type="number"
          placeholder="Stock Quantity"
          className="px-3 py-1 border-blue-500 border-b-[3px]"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-3 w-full text-white bg-blue-800 py-1 px-4 disabled:bg-gray-500"
      >
        {pending ? <Loader2 className="animate-spin h-5 w-5" /> : "Add Product"}
      </button>
    </Form>
  );
}
