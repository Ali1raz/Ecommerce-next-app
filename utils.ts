export function formatDate(date: string | Date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

export function generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export const routes = [
    {id: 1, label: "Home", href: "/", public: true,},
    {id: 2, label: "About", href: "/about-us", public: true,},
    {id: 3, label: "Cart", href: "/cart", public: false,},
    {id: 4, label: "Add New Products", href: "/products/new", public: false,},
    {id: 5, label: "View Dashboard", href: "/dashboard", public: true,},
]

export type TUser = {
    picture: string;
    name: string;
    email?: string;
}

export type TKindeUser = {
    id: string;
    picture: string;
    given_name: string;
    family_name: string;
    email?: string;
}
export type TCategory = {
    id: string,
    name: string,
    slug: string,
}

export type TProductProps = {
    id: string;
    name: string;
    stock_quantity: number;
    rating: number;
    price: number;
    description: string;
    created_at: Date;
    user_id: string;
};

export type TCartProduct = {
    id: string;
    product_id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    total: number;
};