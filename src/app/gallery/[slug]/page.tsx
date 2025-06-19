import { use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { GET_SPECIFIC_POST_ENDPOINT } from '@/config/apiConfig';
import { ERRORS } from '@/config/error';
import { getRequestServerSide } from '@/services/getServerSideRender';

import InnerBanner from '@/components/Banners/InnerBanner';
import DynamicTabs from '@/utlis/DynamicTabs';
import PhotoModal from '@/utlis/PhotoModal';
import Button from '@/components/Button';

async function getAPIRequest(slugInfo: string) {
  const response = await getRequestServerSide(
    `${GET_SPECIFIC_POST_ENDPOINT}?slug=${slugInfo}`,
    cookies().get('locale')?.value
  );

  return response;
}
async function getData(params: any) {
  const dataPromise = getAPIRequest(params);
  const response = await dataPromise;
  if (response.gettingError !== undefined) {
    if (response.gettingError == ERRORS.ERR_BAD_REQUEST) {
      throw notFound();
    }
  } else {
    return response;
  }
}

export async function generateMetadata({ params }: any) {
  // read route params
  const slug = params.slug;
  const response = await getAPIRequest(slug);
  let metaInfo = '';
  if (response.gettingError !== undefined) {
  } else {
    metaInfo = response.title + ' | ';
  }
  return {
    title: `${metaInfo} ULLAS`,
  };
}

export default function Page({ params, searchParams }: any) {
  const t = useTranslations();

  const data = [
    { label: `${t('global.photoGallery')}`, key: 'photos' },
    {
      label: `${t('global.videoGallery')}`,
      key: 'videos',
    },
  ];
  const pageData = use(getData(params.slug));

  const media = pageData.media;

  const filteredMediaPhoto = media.filter((item: any) => item.type == 'image');
  const filteredMediaVideo = media.filter(
    (item: any) => item.type == 'video' || item.type == 'youtube'
  );

  return (
    <>
      <InnerBanner pageData={pageData} />

      <div className="c-body_container">
        <div className="c-body_container_content">
          <div className="cpt-20 ">
            <div className="container custom_container">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="hw d4">
                      <h5 className="hw__title">{pageData.title}</h5>
                    </div>
                    <Link href="/gallery?tab=gallery" className="link">
                      <div className="text-end">
                        <Button color="default" size="xs">
                          &#8592; {t('global.back')}
                        </Button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <DynamicTabs data={data} varient={'d3'}>
                    {searchParams.tab == 'photos' ||
                    searchParams.tab == undefined ? (
                      <>
                        <div className="row">
                          {filteredMediaPhoto.length > 0 ? (
                            <PhotoModal data={filteredMediaPhoto} />
                          ) : (
                            <>
                              <div className="hw d4">
                                <div className="hw__title no_record">
                                  {t('global.noPhotoFound')}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row">
                          {filteredMediaVideo.length > 0 ? (
                            <>
                              <PhotoModal data={filteredMediaVideo} />
                            </>
                          ) : (
                            <>
                              <div className="hw d4">
                                <div className="hw__title no_record">
                                  {t('global.noVideoFound')}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </>
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
