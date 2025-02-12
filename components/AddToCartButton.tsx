"use client"

import { add_to_cart } from "@/app/actions/actions"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {ShoppingCart} from "lucide-react";

export default function AddToCartButton({ productId, stock_quantity, isLoggedIn }: { productId: string; stock_quantity: number, isLoggedIn: boolean }) {
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(false)

    async function handleAddToCart() {
        setLoading(true)
        try {
            const result = await add_to_cart(productId, quantity)
            toast(result.success ? "Added to cart" : "Error adding to cart", {
                action: { label: "Dismiss", onClick: () => toast.dismiss() },
            })
        } catch (error) {
            toast.error(`${error}`)
        }
        setLoading(false)
    }

    useEffect(() => {
        setQuantity((q) => Math.max(1, Math.min(q, stock_quantity)))
    }, [stock_quantity])

    return (
        <div className="flex items-center space-x-4">
            <p>In Stock: {stock_quantity}</p>
            <Select value={quantity.toString()} disabled={!isLoggedIn} onValueChange={(value) => setQuantity(Number.parseInt(value, 10))}>
                <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Quantity" />
                </SelectTrigger>
                <SelectContent>
                    {[...Array(stock_quantity)].map((_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button onClick={handleAddToCart} disabled={loading || !isLoggedIn}
                className={`px-4 py-2 rounded-none bg-yellow-500 hover:bg-yellow-600`}>
                <ShoppingCart/> {isLoggedIn ? 'Add to Cart' : 'Login to Add to Cart'}
            </Button>
        </div>
    )
}

