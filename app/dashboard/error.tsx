"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function DashboardError({error, reset,}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-6">
            <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Something went wrong</h2>
            </div>
            <p className="mt-2 text-sm text-destructive">{error.message || "Failed to load dashboard data"}</p>
            <Button variant="outline" className="mt-4" onClick={() => reset()}>
                Try again
            </Button>
        </div>
    )
}

