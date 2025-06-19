import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

// Can be imported from a shared config
export default getRequestConfig(async () => {
  const locale = cookies().get('locale')?.value || 'en';

  try {
    const global = (await import(`/public/locales/${locale}.json`)).default;
    const menu = (await import(`/public/locales/${locale}/menu.json`)).default;
    const page = (await import(`/public/locales/${locale}/page.json`)).default;
    const post = (await import(`/public/locales/${locale}/post.json`)).default;
    const contentBlock = (
      await import(`/public/locales/${locale}/content-block.json`)
    ).default;
    const postSpecific = (
      await import(`/public/locales/${locale}/post-specific.json`)
    ).default;

    const messages = {
      ...global,
      ...menu.reduce((acc:any, item:any) => {
        item.data.forEach((menuItem:any) => {
          acc[menuItem.name] = menuItem.name;
        });
        return acc;
      }, {}),
      ...page,
      ...post,
      ...contentBlock,
      ...postSpecific,
    };
    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error('Error loading locale data:', error);
    return {
      locale,
      messages: {},
    };
  }
});