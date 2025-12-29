'use client';

import Link from 'next/link';

// Root-level error page for catastrophic errors outside locale context.
// This is a fallback and should rarely be seen.

export default function RootError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Something went wrong!
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        An unexpected error occurred.
                    </p>
                    {error.digest && (
                        <p className="text-sm text-gray-500 font-mono mb-4">
                            Error ID: {error.digest}
                        </p>
                    )}
                    <div className="space-x-4">
                        <button
                            onClick={reset}
                            className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            Try Again
                        </button>
                        <Link
                            href="/"
                            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    );
}
