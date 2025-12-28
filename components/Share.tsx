'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Link, Check } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const copyUrl = async (url: string) => {
    try {
        await navigator.clipboard.writeText(url);
        return true;
    } catch {
        const copyInput = document.createElement('input');
        document.body.appendChild(copyInput);
        copyInput.value = url;
        copyInput.select();
        document.execCommand('copy');
        document.body.removeChild(copyInput);
        return true;
    }
};

interface ShareProps {
    lang: {
        share: string;
        email: string;
        copyLink: string;
        copyLinkSuccess: string;
    };
    url: string;
    title: string;
}

export default function Share({ lang, url, title }: ShareProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await copyUrl(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareToFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const shareToTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
    };

    const shareToLinkedin = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareToWhatsapp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
    };

    const shareToEmail = () => {
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="gap-2 cursor-pointer hover:bg-secondary/80">
                    <Share2 className="h-4 w-4" />
                    {lang.share}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={shareToFacebook} className="gap-2 cursor-pointer">
                    <Facebook className="h-4 w-4" />
                    Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareToTwitter} className="gap-2 cursor-pointer">
                    <Twitter className="h-4 w-4" />
                    Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareToLinkedin} className="gap-2 cursor-pointer">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareToWhatsapp} className="gap-2 cursor-pointer">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={shareToEmail} className="gap-2 cursor-pointer">
                    <Mail className="h-4 w-4" />
                    {lang.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleCopy} className="gap-2 cursor-pointer">
                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link className="h-4 w-4" />}
                    {copied ? lang.copyLinkSuccess : lang.copyLink}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
