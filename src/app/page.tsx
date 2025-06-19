import { use } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Image from 'next/image';
import { cookies } from 'next/headers';
import { GET_SPECIFIC_PAGE_ENDPOINT } from '@/config/apiConfig';
import { getRequestServerSide, serverRequest } from '@/services/getServerSideRender';
import { ERRORS } from '@/config/error';
import dynamic from 'next/dynamic';
import HomeBanner from '@/components/Banners/HomeBanner';
import Notification from '@/utlis/Notification';
import GetPageData from '@/components/Layout/GetPageData';
import { CONSTANTS } from '@/config/constant';
import { decrypt } from '@/utlis/encryption';
const PageWrapper = dynamic(() => import('@/components/Layout/PageWrapper'));

async function getAPIRequest(data: string) {
  try {
    const response = await serverRequest(
      {},
      `${GET_SPECIFIC_PAGE_ENDPOINT}/${data}`,
      CONSTANTS.REQUEST_GET,
      true,
      true
    );
    return response;
  } catch (err) {
    console.error('API Error:', err);
    return { status: CONSTANTS.STATUS_FAILED };
  }
}

async function getData() {
  const dataPromise = getAPIRequest('home');
  const response = await dataPromise;
  // if (response?.gettingError !== undefined) {
  //   if (response?.gettingError == ERRORS.ERR_BAD_REQUEST) {
  //     return { notFound: true }; // Return a special object to indicate not found
  //   }
  // } else {
  //   return response; // Return the entire response object
  // }

  if (response.status == CONSTANTS.STATUS_FAILED) {
    throw notFound();
  }
  if (response.status == CONSTANTS.STATUS_SUCCESS) {
    return JSON.parse(decrypt(response.data));
  }
}

export const metadata: Metadata = {
  title: 'ULLAS',
  description: 'ULLAS',
};

export default async function Home() {
   const pageData = await getData();
  return (
    <main>
      <HomeBanner />
      <PageWrapper pageData={pageData} />
      {/* <GetPageData slug="home" /> */}
      {/* <Notification/> */}
    </main>
  );
}
