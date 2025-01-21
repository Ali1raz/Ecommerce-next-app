import {products} from "../products";
import {corsHeaders} from "../route";

export async function GET(req: Request, {params}: {params: {id: string}}) {
    const {id} = await params;

    const product = products.find(
        (x) => x.id === id);
    if (!product) {
        return new Response(JSON.stringify({error: "Product not found."}), {
            status: 404,
            headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
        }
    });

}