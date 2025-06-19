// export default page;
import { use } from 'react';
import type { Metadata } from 'next';
import { GET_POST_ENDPOINT } from '@/config/apiConfig';
import { getRequestServerSide } from '@/services/getServerSideRender';
import { useTranslations } from 'next-intl';
import { cookies } from 'next/headers';

import InnerBanner from '@/components/Banners/InnerBanner';
import DynamicTabs from '@/utlis/DynamicTabs';
import PhotoModal from '@/utlis/PhotoModal';
import Social from '@/components/gallery/social';

async function getAPIRequest(slugInfo: string) {
  const response = await getRequestServerSide(
    `${GET_POST_ENDPOINT}?slug=${slugInfo}`, cookies().get('locale')?.value
  );
  return response;
}

async function getData(params: any) {
  const dataPromise = getAPIRequest(params);
  const response = await dataPromise;
  return response;
}

export const metadata: Metadata = {
  title: 'Gallery | ULLAS',
  description: 'ULLAS',
};


export default function Gallery({ searchParams }: any) {
  const t = useTranslations();
  const data = [
    { label: `${t('global.social')}`, key: 'social' },
    {
      label: `${t('global.gallery')}`,
      key: 'gallery',
    },
  ];
  const postData = use(getData('gallery'));

  const breadcumbObj = {
    id: '2',
    title:  `${t('global.gallery')}`,
    slug: 'gallery',
  };
  return (
    <>
      <InnerBanner pageData={breadcumbObj} />
      <div className="c-body_container">
        <div className="c-body_container_content">
          <div className="cpt-20 ">
            <div className="container custom_container">
              <div className="row">
                <div className="col-12">
                  <DynamicTabs data={data} varient={'d3'}>
                    {searchParams.tab == 'social' ||
                    searchParams.tab == undefined ? (
                      <Social/>
                    ) : (
                      <div className="row">
                        {postData.length > 0 && <PhotoModal data={postData} />}
                      </div>
                    )}
                  </DynamicTabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
