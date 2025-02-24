"use client"

import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users } from "lucide-react"

interface UsersGraphProps {
    rawData: Array<{
        date: string
        count: number
    }>
}

export default function UsersGraph({ rawData }: UsersGraphProps) {
    // console.log(rawData)

    return (
        <div className="w-full max-w-7xl mx-auto space-y-4">
            <h1 className="text-2xl font-semibold">Users per Day</h1>
            <ChartContainer
                config={{users: {label: "Users", color: "hsl(var(--chart-2))", icon: Users,},}}
                className="">
                <LineChart accessibilityLayer data={rawData}>
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
                    <Line
                        type="monotone"
                        dataKey="count"
                        name="users"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        dot={{fill: "hsl(var(--chart-1))",}}
                        activeDot={{r: 6,}}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    )
}

