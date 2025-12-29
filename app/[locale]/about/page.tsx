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
    const about = await readMd(locale, 'about');

    return {
        title: `${about.title} | Gez.la`,
        openGraph: {
            title: about.title,
            description: about.meta
        }
    };
}

export default async function AboutPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const about = await readMd(locale, 'about');

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader className="border-b">
                    <CardTitle className="text-3xl sm:text-4xl">{about.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <article
                        className="markdown-content"
                        dangerouslySetInnerHTML={{ __html: about.contentHtml }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
