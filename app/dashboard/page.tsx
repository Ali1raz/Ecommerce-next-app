import { getStats } from "./actions"
import { ViewSelector } from "./components/view-selector"
import CategoriesGraph from "./components/CategoriesGraph"
import ProductsGraph from "./components/ProductsGraph"
import UsersGraph from "./components/UsersGraph"
import type { StatsResponse } from "./types"

export default async function Dashboard({searchParams,}: {
    searchParams: Promise<{ view?: string }>;
}) {
    const {view} =  await searchParams;
    const { success, data } = (await getStats()) as StatsResponse

    if (!success || data instanceof Error) {
        return (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
                <h1 className="text-lg font-semibold text-destructive mb-2">Error Loading Dashboard</h1>
                <p className="text-destructive">{data instanceof Error ? data.message : "Failed to fetch dashboard data"}</p>
            </div>
        )
    }

    const productsData = Object.entries(data.products).map(([date, count]) => ({date, count,}))

    const usersData = Object.entries(data.users).map(([date, count]) => ({
        date,
        count,
    }))

    const views = {
        all: (
            <div className="grid gap-8 ">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                        <div className="space-y-8">
                            <h2 className="text-lg font-semibold">Recent Activity</h2>
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Total Products</span>
                                    <span className="text-2xl font-bold">{Object.values(data.products).reduce((a, b) => a + b, 0)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Total Users</span>
                                    <span className="text-2xl font-bold">{Object.values(data.users).reduce((a, b) => a + b, 0)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Categories</span>
                                    <span className="text-2xl font-bold">{data.categories.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border p-4">
                        <CategoriesGraph rawData={data.categories} />
                    </div>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                        <UsersGraph rawData={usersData} />
                    </div>
                    <div className="rounded-lg border p-4">
                        <ProductsGraph rawData={productsData} />
                    </div>
                </div>
            </div>
        ),
        categories: <CategoriesGraph rawData={data.categories} />,
        users: <UsersGraph rawData={usersData} />,
        products: <ProductsGraph rawData={productsData} />,
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <ViewSelector />
                <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</div>
            </div>
            {views[view as keyof typeof views]}
        </div>
    )
}

