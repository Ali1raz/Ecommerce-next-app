import { get_cart_items } from "../actions/actions";
import CartProduct from "../../components/CartProduct";
import { Product } from "@/utils";
import Link from "next/link";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function CartPage() {
  const {getUser} = getKindeServerSession();
  const user = getUser();

  if (!user) {
    return (
        <div>
          <h2 className='text-center mt-4 text-xl text-amber-600'>You need to create account to view this page.</h2>
          <Link href="/api/auth/login">Login/Sign Up</Link>
        </div>
    )
  }

  let cartItems: Product[] = [];

  try {
    const response = await get_cart_items();
    cartItems = Array.isArray(response) ? response : response.items || [];
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }

  return (
    <div className="  max-w-5xl mx-auto py-4 mb-8 px-8">
      <h1 className="text-2xl font-bold mb-5">Cart Items:</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-xl">
          Cart is empty. Go{" "}
          <Link
            href="/"
            className="underline  underline-offset-4 hover:decoration-blue-400 decoration-amber-300"
          >
            back
          </Link>{" "}
          and add some products!
        </p>
      ) : (
        <div className="space-y-4">
          <Link
            href="cart/bill"
            className="underline hover:decoration-blue-400"
          >
            View Bill
          </Link>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
            {cartItems?.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}