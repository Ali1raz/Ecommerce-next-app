"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

interface ProductsGraphProps {
    rawData: Array<{
        date: string
        count: number
    }>
}

export default function ProductsGraph({ rawData }: ProductsGraphProps) {
    // console.log(rawData)
    return (
        <div className="w-full max-w-7xl mx-auto space-y-4">
            <h1 className="text-2xl font-semibold">Products per Day</h1>
            <ChartContainer
                config={{
                    products: {
                        label: "Products",
                        color: "hsl(var(--chart-1))",
                        icon: TrendingUp,
                    },
                }}
                className=""
            >
                <LineChart
                    accessibilityLayer
                    data={rawData}
                    margin={{left: 12, right: 12,}}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="count" name="products"
                        stroke="var(--color-products)" strokeWidth={2}
                        dot={{fill: "var(--color-products)",}}
                        activeDot={{r: 6,}}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    )
}

