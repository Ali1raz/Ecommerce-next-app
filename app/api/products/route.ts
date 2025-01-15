import {products} from "./products"
import {randomUUID} from "node:crypto";

export async function GET() {
    return Response.json(products);
}

export async function POST(request: Request){
    const product = await request.json();
    console.log(products);
    const newProduct = {
        id: randomUUID(),
        name: product.name,
        image: product.image,
        rating: product.rating,
        "priceCents": product.priceCents,
        "keywords": product.keywords,
    }

    products.push(newProduct);

    return new Response(JSON.stringify(newProduct), {
        status: 201,
        headers: {"Content-Type": "application/json"},
    });
}