import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

export default async function readMd(locale, fileName) {
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

  contentHtml = contentHtml.replace(/<p>/g, '<p class="my-3">');
  contentHtml = contentHtml.replace(
    /<a /g,
    '<a target="_blank" rel="noopener noreferrer" '
  );
  contentHtml = contentHtml.replace(
    /<h2>/g,
    '<h2 class="text-3xl font-bold border-solid border-b-2 pt-4 pb-4 border-gray-600">'
  );
  contentHtml = contentHtml.replace(/<ul>/g, '<ul class="list-disc pl-10">');
  contentHtml = contentHtml.replace(/<li>/g, '<li class="pb-2">');

  return {
    contentHtml,
    ...matterResult.data
  };
}
