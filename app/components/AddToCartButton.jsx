"use client";

import {add_to_cart} from "@/app/actions/actions";
import React from "react";

export default function AddToCartButton({productId, stock_quantity}) {
    const [message, setMessage] = React.useState("");
    const [quantity, setQuantity] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    async function handleAddToCart() {
        setLoading(true);
        try {
            const result = await add_to_cart(productId, quantity);
            if (result) {
                setMessage("Added to cart");
            } else {
                setMessage("Error adding to cart");
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            setMessage("Error adding to cart");
        }
        setLoading(false);
        setTimeout(() => setMessage(""), 2000);
    }

    React.useEffect(() => {
        if (quantity < 1) {
            setQuantity(1);
        } else if (quantity > stock_quantity) {
            setQuantity(stock_quantity);
        }
    }, [quantity, stock_quantity]);

    return (
        <div className="flex items-center justify-center ">
            <p className="mr-4">In Stock: {stock_quantity}</p>

            <input
                type="number"
                className="w-16 text-black border border-gray-400 px-2 py-1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                min={1}
                max={stock_quantity}
            />

            <button
                className={`ml-2 px-4 py-1 ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                } text-white`}
                onClick={handleAddToCart}
                disabled={loading}
            >
                {loading ? "Adding..." : "Add to Cart"}
            </button>
            {message && <p className="ml-2 text-sm text-white">{message}</p>}
        </div>
    );
}
