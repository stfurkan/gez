'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="max-w-2xl mx-auto mt-20">
            <Card className="text-center">
                <CardHeader className="border-b">
                    <CardTitle className="text-3xl sm:text-4xl flex items-center justify-center gap-3">
                        <AlertTriangle className="h-8 w-8 text-destructive" />
                        Something went wrong!
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                    <p className="text-lg text-muted-foreground">
                        An unexpected error occurred. Please try again.
                    </p>
                    {error.digest && (
                        <p className="text-sm text-muted-foreground font-mono">
                            Error ID: {error.digest}
                        </p>
                    )}
                    <Button onClick={reset}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
