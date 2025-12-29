'use client';

import Link from 'next/link';

// Root-level not-found page for non-localized requests.
// This handles URLs like /robots.txt or /unknown.txt that don't match
// the proxy matcher pattern (files with extensions are excluded).
//
// Since this is outside the [locale] segment, we cannot use translations.
// We render a styled 404 page with English as the default language.
//
// Must be a Client Component with full HTML structure per Next.js requirements.

export default function RootNotFound() {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-background text-foreground">
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-card rounded-lg border shadow-lg overflow-hidden">
                        <div className="border-b px-6 py-4">
                            <h1 className="text-3xl sm:text-4xl font-semibold text-center">
                                404 - Page Not Found
                            </h1>
                        </div>
                        <div className="px-6 py-6 space-y-4 text-center">
                            <p className="text-lg text-muted-foreground">
                                The page you&apos;re looking for doesn&apos;t exist or has been moved.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}

