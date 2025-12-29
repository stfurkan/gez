import { notFound } from 'next/navigation';

// This catch-all route is REQUIRED by next-intl to handle unknown routes within [locale].
// Without this, accessing /tr/unknown-page would fall through to the root 404
// instead of the locale-aware not-found.tsx with header/footer.
// 
// How it works:
// 1. User visits /tr/some-nonexistent-page
// 2. Next.js matches [locale] = "tr", [...rest] = ["some-nonexistent-page"]
// 3. This page calls notFound()
// 4. Next.js renders the closest not-found.tsx (which is app/[locale]/not-found.tsx)
// 5. User sees localized 404 page with header and footer

export default function CatchAllPage() {
    notFound();
}
