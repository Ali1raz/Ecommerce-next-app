import { products } from "./products";
import { randomUUID } from "node:crypto";

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "Content-Type",
};


export async function GET() {
    return new Response(JSON.stringify(products), {
        status: 200,
        headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
        },
    });
}

export async function POST(request: Request) {
    try {
        const product = await request.json();
        const newProduct = {
            id: randomUUID(),
            name: product.name,
            image: product.image,
            rating: product.rating,
            priceCents: product.priceCents,
            keywords: product.keywords,
        };
        products.push(newProduct);
        return new Response(JSON.stringify(newProduct), {
            status: 201,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Invalid request body." }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}
