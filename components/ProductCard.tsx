import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate, type TProductProps } from "@/utils"
import { get_categories, getUserbyId } from "@/app/actions/actions"
import CategoryButton from "@/components/CategoryButton"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import DeleteProductButton from "@/components/DeleteProductButton"

export default async function ProductCard({ product }: { product: TProductProps }) {
    const { name, id: product_id, user_id, price, rating, created_at, stock_quantity } = product
    const categories = await get_categories(product_id)
    const productOwner = await getUserbyId(user_id)
    const { getUser } = getKindeServerSession()
    const loggedInUser = await getUser()

    const canDelete = loggedInUser?.id === productOwner?.id

    return (
        <div className="group overflow-hidden border max-w-[400px] bg-card transition-colors hover:border-accent">
            <div className="relative flex h-[200px] w-full items-center justify-center bg-muted">
                {/*<Image ...></Image>*/}
                <Badge variant={stock_quantity > 0 ? "secondary" : "destructive"} className="absolute right-2 top-2">
                    {stock_quantity} in stock
                </Badge>
                {canDelete && (
                    <DeleteProductButton
                        productId={product_id}
                        className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                )}
            </div>

            <div className="p-4 border space-y-1.5">
                <Link href={`/products/${product_id}`} className="inline-block hover:underline">
                    <h3 className="line-clamp-1 font-semibold capitalize">{name}</h3>
                </Link>

                <div className="mt-2 flex items-center justify-between">
                    <p className="flex items-center text-primary">
                        <span className="text-xs">Rs</span>
                        <span className="ml-1 text-lg font-bold">{price}</span>
                    </p>
                    <div className="flex items-center gap-1">
                        <span>{rating}</span>
                        <span className="text-yellow-400">⭐</span>
                    </div>
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-none">
                    {categories.map((category) => (
                        <CategoryButton key={category.id} category={category} />
                    ))}
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="px-0 bg-transparent h-fit text-muted-foreground" asChild>
                        <Link href={`/user/${user_id}`}>{productOwner?.name}</Link>
                    </Button>
                    <Badge variant="outline" className="text-xs">
                        {formatDate(created_at)}
                    </Badge>
                </div>
            </div>
        </div>
    )
}

