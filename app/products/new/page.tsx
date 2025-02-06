import AddProductForm from "@/components/AddProductForm";

export default async function AddNewProduct() {
  return (
    <div className="flex flex-col gap-3 max-w-xl  mt-6 mx-auto ">
      <h1 className="text-2xl ps-4 font-bold">Add new Product</h1>
      <AddProductForm />
    </div>
  );
}
