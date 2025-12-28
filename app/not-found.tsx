import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="bg-white text-center shadow overflow-hidden rounded-lg mx-8">
            <div className="px-3 py-3 border-b border-gray-500 mx-3">
                <h2 className="text-4xl leading-10 font-bold text-gray-900">
                    Page not found!
                </h2>
            </div>
            <div className="bg-gray-50 px-4 py-5 grid grid-cols-1 gap-4 px-6">
                <span className="text-lg leading-5 font-medium text-gray-900">
                    The page you were looking for could not be found...
                </span>
                <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}
