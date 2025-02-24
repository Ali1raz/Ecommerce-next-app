"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ViewSelector() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentView = searchParams.get("view") || "all"

    return (
        <Select
            defaultValue={currentView}
            onValueChange={(value) => {
                const params = new URLSearchParams(searchParams)
                params.set("view", value)
                router.push(`/dashboard?${params.toString()}`)
            }}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Charts</SelectItem>
                <SelectItem value="categories">Categories</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="products">Products</SelectItem>
            </SelectContent>
        </Select>
    )
}

