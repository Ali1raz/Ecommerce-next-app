export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

export function generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export type TCategory = {
    id: string;
    name: string;
    slug: string;
}

export type TProductProps = {
    id: string;
    name: string;
    stock_quantity: number;
    rating: number;
    price: number;
    description: string;
    created_at: string;
    user_id: string;
    categories: TCategory[];
};

export type TCartProduct = {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    total: number;
};