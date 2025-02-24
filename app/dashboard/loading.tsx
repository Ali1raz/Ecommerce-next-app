import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[180px]" />
                <Skeleton className="h-5 w-[200px]" />
            </div>
            <div className="grid gap-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <Skeleton className="h-[300px] rounded-lg" />
                    <Skeleton className="h-[300px] rounded-lg" />
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    <Skeleton className="h-[300px] rounded-lg" />
                    <Skeleton className="h-[300px] rounded-lg" />
                </div>
            </div>
        </div>
    )
}

