import '../styles/main.css';

// Since we have a root `not-found.tsx` page, a layout file is required,
// even if it's just passing children through (per next-intl docs).
// The [locale]/layout.tsx handles the full layout with <html>/<body>.
export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return children;
}
