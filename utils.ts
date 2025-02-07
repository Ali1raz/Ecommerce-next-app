export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

export type Product = {
    id: string;
    name: string;
    stock_quantity: number;
    rating: number;
    price: number;
    description: string;
    created_at: string;
};

export type TCartProduct = {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    total: number;
};