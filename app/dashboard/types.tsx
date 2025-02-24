export interface CategoryStats {
    id: string
    name: string
    _count: {
        products: number
    }
}

export interface DashboardData {
    products: Record<string, number>
    users: Record<string, number>
    categories: CategoryStats[]
}

export interface StatsResponse {
    success: boolean
    data: DashboardData | Error
}

