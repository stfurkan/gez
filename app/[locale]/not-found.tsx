import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

// This is the locale-aware not-found page.
// It's triggered by the catch-all route [...rest]/page.tsx calling notFound()
// This page uses the locale layout, so it has header/footer and translations.

export default function NotFound() {
    const t = useTranslations('notFound');

    return (
        <div className="max-w-2xl mx-auto mt-20">
            <Card className="text-center">
                <CardHeader className="border-b">
                    <CardTitle className="text-3xl sm:text-4xl">
                        {t('title')}
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <p className="text-lg text-muted-foreground">
                        {t('desc')}
                    </p>
                    <Button asChild className="!text-white">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            {t('goHome')}
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
