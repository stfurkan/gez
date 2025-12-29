import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Locale = 'en' | 'tr';

// Locale-aware keywords
const keywordsByLocale = {
    en: ['virtual tours', 'museums', 'galleries', 'aquariums', 'zoos', 'travel', 'explore', 'online tours', 'cultural sites'],
    tr: ['sanal tur', 'müze', 'galeri', 'akvaryum', 'hayvanat bahçesi', 'seyahat', 'keşfet', 'online tur', 'kültürel mekanlar'],
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'seo' });

    const baseUrl = 'https://gez.la';
    const url = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;
    const keywords = keywordsByLocale[locale as Locale] || keywordsByLocale.en;

    return {
        metadataBase: new URL(baseUrl),
        title: {
            default: t('title'),
            template: `%s | Gez.la`,
        },
        description: t('description'),
        keywords,
        authors: [{ name: 'Sait Furkan Teke', url: 'https://www.linkedin.com/in/stfurkan' }],
        creator: 'Sait Furkan Teke',
        openGraph: {
            title: t('title'),
            description: t('description'),
            url,
            siteName: 'Gez.la',
            locale: locale === 'tr' ? 'tr_TR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            site: '@lagezla',
            creator: '@lagezla',
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon.ico',
            apple: '/gezla-square.png',
        },
        manifest: '/manifest.json',
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: url,
            languages: {
                'en': baseUrl,
                'tr': `${baseUrl}/tr`,
            },
        },
    };
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#0d9488' },
        { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
    ],
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    // Get messages for client components
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider messages={messages}>
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="w-full my-5 flex-1 px-4">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
            {process.env.GA_TRACKING_ID && (
                <GoogleAnalytics gaId={process.env.GA_TRACKING_ID} />
            )}
        </html>
    );
}
