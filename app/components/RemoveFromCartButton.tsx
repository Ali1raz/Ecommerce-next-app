"use client";

import {useState} from "react";
import {remove_product_from_cart} from "@/app/actions/actions";
import {useRouter} from "next/navigation";

export default function RemoveFromCartButton({id}: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleRemove() {
        setLoading(true); // Disable button while removing
        try {
            await remove_product_from_cart(id);
            router.refresh();
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleRemove}
            disabled={loading}
            className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-400"
        >
            {loading ? "Removing..." : "Remove"}
        </button>

    );
}
