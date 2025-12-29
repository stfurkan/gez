import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface MdContent {
    contentHtml: string;
    title?: string;
    meta?: string;
    [key: string]: any;
}

export default async function readMd(locale: string, fileName: string): Promise<MdContent> {
    const langDirectory =
        locale === 'tr'
            ? path.join(process.cwd(), 'lang/tr')
            : path.join(process.cwd(), 'lang/en');
    const fullPath = path.join(langDirectory, `${fileName}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    let contentHtml = processedContent.toString();

    // Add target blank to links for external navigation
    contentHtml = contentHtml.replace(
        /<a /g,
        '<a target="_blank" rel="noopener noreferrer" '
    );

    return {
        contentHtml,
        ...matterResult.data
    };
}
