import { use } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { GET_SPECIFIC_PAGE_ENDPOINT } from '@/config/apiConfig';
import { ERRORS } from '@/config/error';
import { getRequestServerSide, serverRequest } from '@/services/getServerSideRender';
import InnerBanner from '@/components/Banners/InnerBanner';
import { cookies } from 'next/headers';
import GetPageData from '@/components/Layout/GetPageData';
import { CONSTANTS } from '@/config/constant';
import { decrypt } from '@/utlis/encryption';

const PageWrapper = dynamic(() => import('@/components/Layout/PageWrapper'));

const data = [
  { label: 'Social Media', key: 'social' },
  {
    label: 'Gallery',
    key: 'gallery',
  },
];

async function getAPIRequest(data: string) {
  try {
    const response = await serverRequest(
      {},
      `${GET_SPECIFIC_PAGE_ENDPOINT}/${data}`,
      CONSTANTS.REQUEST_GET,
      true,
      true
    );
    console.log(response, 'getAPI Request'); // Optional: remove in production
    return response;
  } catch (err) {
    console.error('API Error:', err); // Optional: remove in production
    return { status: CONSTANTS.STATUS_FAILED };
  }
}


async function getData(params: any) {
  const dataPromise = getAPIRequest(params.pageSlug);
  console.log(params.pageSlug, 'getData params'); // Optional: remove in production
  const response = await dataPromise;
  // if (response.status !== ) {
  //   if (response.gettingError == ERRORS.ERR_BAD_REQUEST) {
  //     throw notFound();
  //   }
  // } else {
  //   return response[0];
  // }

  console.log(response, 'getData response'); // Optional: remove in production

  if(response.status == CONSTANTS.STATUS_FAILED) {
    throw notFound();
  }
   if(response.status == CONSTANTS.STATUS_SUCCESS) {
     return JSON.parse(decrypt(response.data));
  }
}

export async function generateMetadata({ params }: any) {
  // read route params
  const slug = params.pageSlug;
  const formattedSlug = slug.replace(/-/g, ' ');
  return {
    title: `ULLAS | ${formattedSlug.charAt(0).toUpperCase() + formattedSlug.slice(1)}`,
  };
}

export default async function Page({ params }: any) {
  console.log(params, 'Page params'); // Optional: remove in production
  const pageData = await getData(params);
  return (
    <>
      {pageData.slug != 'home' && <InnerBanner pageData={pageData} />}
      <PageWrapper pageData={pageData} />
    </>
  );
}
