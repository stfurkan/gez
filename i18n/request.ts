import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Validate that the locale is supported
    if (!locale || !routing.locales.includes(locale as 'en' | 'tr')) {
        locale = routing.defaultLocale;
    }

    // Load the language JSON file
    const messages = (await import(`../lang/${locale}/lang.json`)).default;

    return {
        locale,
        messages
    };
});
