import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Analytics Dashboard",
    description: "View products, users, and category statistics.",
}

export default function DashboardLayout({children,}: { children: React.ReactNode }) {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="container py-6">
                <div className="flex flex-col gap-1 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
                    <p className="text-muted-foreground">Monitor products, users, and categories over time.</p>
                </div>
                {children}
            </div>
        </div>
    )
}

