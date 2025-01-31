import {get_cart_items} from "../actions/actions";
import CartProduct from "../components/CartProduct";

type Product = {
    id: string;
    name: string;
    quantity: number;
    total: number;
    price: number;
    description: string;
};

export default async function CartPage() {

    let cartItems: Product[] = [];

    try {
        const response = await get_cart_items();
        cartItems = Array.isArray(response) ? response : response.items || [];
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
    // console.log(await get_cart_items());
    return (
        <div className='  max-w-5xl mx-auto py-4 mb-8 px-8'>
            <h1 className='text-2xl font-bold'>Cart Items:</h1>
            {cartItems.length === 0 ? (
                <p>Cart is empty. Go back and add some products!</p>
            ) : (
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 '>
                    {cartItems?.map(product => (
                        <CartProduct key={product.id} product={product}/>
                    ))}
                </div>
            )}
        </div>
    )
}