import Products from "@/app/components/Products";
export default function Home() {
  return (
    <div>
        <div className='text-center my-4'>
            <h2 className='font-bold text-3xl'>New Year, now you</h2>
            <h3>Shop deal</h3>
        </div>
        <Products />
    </div>
  );
}
