"use client"

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"
import type { CategoryStats } from "../types"

interface CategoriesGraphProps {
    rawData: CategoryStats[]
}

export default function CategoriesGraph({ rawData }: CategoriesGraphProps) {
    const data = rawData.map((category) => ({
        name: category.name,
        count: category._count.products,
    }))

    return (
        <>
            <h1 className="text-2xl font-semibold">Users per Day</h1>
            <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value} products`, "Products"]} />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
        </>
    )
}

