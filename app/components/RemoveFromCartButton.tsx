"use client";

import {useState} from "react";
import {remove_product_from_cart} from "@/app/actions/actions";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

export default function RemoveFromCartButton({id}: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleRemove() {
        setLoading(true); // Disable button while removing
        try {
            await remove_product_from_cart(id);
            router.refresh();
        } catch (error) {
            console.log("Failed to remove item from cart:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button variant='destructive'
                onClick={handleRemove}
                disabled={loading}
                className="px-2 py-0 rounded-none disabled:bg-gray-400"
        >
            {loading && (<Loader2 className='animate-spin'/>)}
            {loading ? "Removing..." : "Remove"}
        </Button>

    );
}
