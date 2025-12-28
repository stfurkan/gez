import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import readMd from '@/lib/readMd';

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
        <>
            <div className="bg-white shadow overflow-hidden rounded-lg mx-8">
                <div className="px-3 py-3 border-b border-gray-500 mx-3">
                    <h1 className="text-4xl leading-10 font-bold text-gray-900">
                        {about.title}
                    </h1>
                </div>
                <div className="bg-gray-50 px-4 pt-2 pb-5 grid grid-cols-1 gap-4 px-6">
                    <span className="text-lg leading-5 font-medium text-gray-900">
                        <div dangerouslySetInnerHTML={{ __html: about.contentHtml }} />
                    </span>
                </div>
            </div>
        </>
    );
}
