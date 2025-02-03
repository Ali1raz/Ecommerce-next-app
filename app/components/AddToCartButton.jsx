"use client";

import {add_to_cart} from "@/app/actions/actions";
import {useState, useEffect} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

export default function AddToCartButton({productId, stock_quantity}) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    async function handleAddToCart() {
        setLoading(true);
        try {
            const result = await add_to_cart(productId, quantity);
            toast(result ? "Added to cart" : "Error adding to cart", {
                action: {label: "Dismiss", onClick: toast.dismiss},
            });
        } catch {
            toast.error("Error adding to cart");
        }
        setLoading(false);
    }

    useEffect(() => {
        setQuantity((q) => Math.max(1, Math.min(q, stock_quantity)));
    }, [stock_quantity]);

    return (
        <div className="flex items-center space-x-4">
            <p>In Stock: {stock_quantity}</p>
            <Input
                type="number"
                className="w-16 border px-2 py-1 rounded-none"
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value || 1)}
                min={1}
                max={stock_quantity}
            />
            <Button
                className={`px-4 rounded-none py-1 ${loading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"}`}
                onClick={handleAddToCart}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add to Cart"}
            </Button>
        </div>
    );
}
