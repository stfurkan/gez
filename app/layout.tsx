import '../styles/main.css';

export const metadata = {
    icons: {
        icon: '/favicon.ico'
    }
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return children;
}
