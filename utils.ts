export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
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
};

export type TCartProduct = {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    total: number;
};