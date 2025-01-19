import { products } from "./products";
import { randomUUID } from "node:crypto";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "Content-Type",
};


export async function GET() {
    // Return products as JSON
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
        // Parse the request body
        const product = await request.json();

        // Create a new product with unique ID
        const newProduct = {
            id: randomUUID(),
            name: product.name,
            image: product.image,
            rating: product.rating,
            priceCents: product.priceCents, // No need for quotes
            keywords: product.keywords, // No need for quotes
        };

        // Add the new product to the array
        products.push(newProduct);

        // Respond with the newly created product
        return new Response(JSON.stringify(newProduct), {
            status: 201,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        // Handle potential errors
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
