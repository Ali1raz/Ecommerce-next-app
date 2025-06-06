import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p className="text-xl text-gray-600 mb-8">Oops! The page you&#39;re looking for does&#39;t exist.</p>
                <Link
                    href="/"
                    className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
}

