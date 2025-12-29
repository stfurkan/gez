import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import readMd from '@/lib/readMd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const terms = await readMd(locale, 'terms');

    return {
        title: `${terms.title} | Gez.la`,
        openGraph: {
            title: terms.title,
            description: terms.meta
        }
    };
}

export default async function TermsPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const terms = await readMd(locale, 'terms');

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader className="border-b">
                    <CardTitle className="text-3xl sm:text-4xl">{terms.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <article
                        className="markdown-content"
                        dangerouslySetInnerHTML={{ __html: terms.contentHtml }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
