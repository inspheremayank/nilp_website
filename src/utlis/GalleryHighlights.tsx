'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import DynamicTabs from './DynamicTabs';
import Social from '@/components/gallery/social';
import Button from '@/components/Button';

import { monthNames } from '@/config/config';

const GalleryHighlights = (props: any) => {
  const t = useTranslations();
  const data = [
    { label: `${t('global.social')}`, key: 'social' },
    {
      label: `${t('global.gallery')}`,
      key: 'gallery',
    },
  ];
  const searchParams = useSearchParams();
  const galleryData = props.postData;
  let formatDate = '';

  var search: any = '';
  if (searchParams != null) {
    search = searchParams.get('tab');
  }

  const getImageCount = (media: any[]) => {
    const images = media.filter((item: any) => item.type === 'image');
    return images.length;
  };
  const getVideoCount = (media: any[]) => {
    const images = media.filter((item: any) => item.type != 'image');
    return images.length;
  };

  return (
    <>
      <DynamicTabs data={data} varient={'d3'}>
        {search == 'social' || search == undefined ? (
          <Social limit={4}/>
        ) : (
          <>
            <div className="row">
              {galleryData.length > 0 &&
                galleryData.slice(0, 6).map((item: any, index: number) => {
                  if (item.postingDate) {
                    const postingDate = new Date(item.postingDate);
                    const month = monthNames[postingDate.getMonth()];
                    const date = postingDate.getDate();
                    const year = postingDate.getFullYear();
                    formatDate =
                      (date < 10 ? '0' + date : date) +
                      '-' +
                      month.slice(0, 3) +
                      '-' +
                      year;
                  }
                  return (
                    <Link
                      href="/gallery?tab=gallery"
                      className="col-12 col-md-6 col-xl-4"
                      key={index}
                    >
                      <div className="c-card d6">
                        <div className="ratio ratio-16x9">
                          <Image
                            src={`/newnilp${item.featuredMedia.cdnPath}`}
                            className="img-fluid"
                            alt={item.title}
                            width={800}
                            height={600}
                          />
                        </div>
                        <span className="c-card_media_counts">
                          <span className="pe-2">
                            {`${getImageCount(item.media)} ${
                              getImageCount(item.media) === 1
                                ? 'Photo'
                                : 'Photos'
                            }`}
                          </span>
                          <span>{`${getVideoCount(item.media)} ${
                            getVideoCount(item.media) === 1 ? 'Video' : 'Videos'
                          }`}</span>
                        </span>
                        <div className="c-card__label">{item.title}</div>
                        <div className="c-card__button card-footer">
                          <Button color="primary" varient="solid" radius="md">
                            {t('global.viewMore')}
                          </Button>
                          <div className="gc d6 bold card-span">
                            <div className="gc__content">
                              <span>{t('global.published')}: </span>
                              {formatDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
            {galleryData.length > 6 && (
              <div className="my-4 text-center">
                <Link href="gallery?tab=gallery">
                  <Button color="primary" radius="md">
                    {' '}
                    {`${t('global.viewMore')}`}{' '}
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </DynamicTabs>
    </>
  );
};

export default GalleryHighlights;
