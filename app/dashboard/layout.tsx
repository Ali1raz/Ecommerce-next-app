import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='max-w-4xl mx-auto bg-black min-h-screen text-white'>
            <Link href='/dashboard' className='text-center sticky top-0 bg-violet-800 w-full block'>Refresh</Link>
            <div className='px-2 flex gap-2 mb-2'>
                <Link className='decoration-blue-700' href='/dashboard/?filter=users'>users</Link>
                <Link className='decoration-blue-700' href='/dashboard/?filter=products'>products</Link>
                <Link className='decoration-blue-700' href='/dashboard/?filter=categories'>categories</Link>
            </div>
            {children}
        </div>
    )
}