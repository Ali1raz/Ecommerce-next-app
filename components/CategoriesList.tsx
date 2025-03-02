import {get_categories} from "@/app/actions/actions";
import CategoryButton from "@/components/CategoryButton";
import {TCategory} from "@/utils";

export default async function CategoriesList({query, category}: {query?: string, category?: string}) {
    const all_categories: TCategory[] = await get_categories(query, category)
    return (
        <>
            <h1 className='text-xl mx-4 mb-2'>Explore Categories</h1>
            <div className="flex w-full px-4 overflow-x-scroll space-x-2 scrollbar-none">
                {all_categories.map((category) => (
                    <CategoryButton category={category} key={category.id} />
                ))}
            </div>
        </>
    )
}