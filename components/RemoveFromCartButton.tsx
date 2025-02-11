"use client";

import { useState } from "react";
import { remove_product_from_cart } from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Trash} from "lucide-react";
import {toast} from "sonner";

export default function RemoveFromCartButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    setLoading(true);
    try {
      await remove_product_from_cart(id);
      router.refresh();
      toast.message('Product removed', {
        action: {
          label: "OK",
          onClick: () => toast.dismiss()
        },
      });
    } catch (error) {
      toast.error("Failed to remove item from cart");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleRemove}
      disabled={loading}
      className="px-3 rounded-none disabled:bg-gray-400"
    >
      {loading && <Loader2 className='animate-spin h-5 w-5 '/>}
      <Trash/>Remove
    </Button>
  );
}
