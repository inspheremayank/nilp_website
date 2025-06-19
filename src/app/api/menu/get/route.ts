import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const getSlugValue = searchParams.get('slug');
  let lang = request.headers.get('Accept-Language') || 'en';
  lang = lang.split('-')[0];
  if (lang === '*') {
    lang = 'en';
  }
  const filePath = path.resolve(`./public/locales/${lang}/menu.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const pageData = JSON.parse(fileContents);
  const getSpecificItem = pageData.filter(
    (item: any) => getSlugValue == item.slug
  );

  const value = getSpecificItem.length == 0 ? [] : getSpecificItem[0];
  return NextResponse.json(value);
}
