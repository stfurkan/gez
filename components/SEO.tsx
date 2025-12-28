'use client';

import Head from 'next/head';
import { useLocale, useTranslations } from 'next-intl';

export default function SEO() {
    const locale = useLocale();
    const t = useTranslations('seo');

    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="description" content={t('description')} />

            <meta name="twitter:card" content="summary_large_image" key="twcard" />
            <meta name="twitter:site" content="@lagezla" key="twhandle" />

            <meta property="og:url" content="https://gez.la" key="ogurl" />
            <meta
                property="og:image"
                content="https://gez.la/gezla.png"
                key="ogimage"
            />
            <meta property="og:site_name" content="Gez.la" key="ogsitename" />
            <meta property="og:title" content={t('title')} key="ogtitle" />
            <meta property="og:description" content={t('description')} key="ogdesc" />
            <title>{t('title')}</title>
        </Head>
    );
}
