import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Required for next-intl compatibility with Turbopack
    turbopack: {}
};

export default withNextIntl(nextConfig);
