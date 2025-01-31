'use server'

import {add_new_product} from "@/app/actions/actions";

export type Errors = {
    product_name?: string;
    product_description?: string;
    price?: string;
    categories?: string;
    stock_quantity?: string;
}
export type FormState = {
    errors: Errors;
}

export async function createProduct(prevState: FormState, formData: FormData) {
    const product_name = formData.get('product_name') as string;
    const product_description = formData.get('product_description') as string;
    const price = formData.get('price') as string;
    const stock_quantity = formData.get('stock_quantity') as string;
    const categories = formData.get('categories') as string;

    const errors: Errors = {}
    if (!product_name) {
        errors.product_name = 'Title is required';
    }
    if (!product_description) {
        errors.product_description = 'Description is required';
    }
    if (!price) {
        errors.price = 'Price is required';
    }
    if (!stock_quantity) {
        errors.stock_quantity = 'Stock quantity is required';
    }
    if (!categories) {
        errors.categories = 'Category is required';
    }

    if (Object.keys(errors).length > 0) {
        return {errors}
    }
    await add_new_product(product_name, product_description, price, categories, stock_quantity);
}