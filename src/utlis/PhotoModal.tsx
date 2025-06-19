'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { monthNames } from '@/config/config';
import FancyBox from '@/components/FancyBox';
import Button from '@/components/Button';



const GalleryMapping = (props: any) => {
  return (
    <>
      <Link href={`gallery/${props.item.slug}`}>{props.children}</Link>
    </>
  );
};

const PhotoModal = (props: any) => {
  const item = props.data;
  const t = useTranslations();
  const [fancyboxIsActive, setFancyboxIsActive] = useState(false);

  let formatDate = '';
  const getVideoPath = (item: any) => {
    if (item.type === 'youtube') {
      const arr = item.cdnPath.split('/');
      return arr[arr.length - 1];
    }
    return item.cdnPath;
  };

  const getImageCount = (media: any[]) => {
    const images = media.filter((item: any) => item.type === 'image');
    return images.length;
  };
  const getVideoCount = (media: any[]) => {
    const images = media.filter((item: any) => item.type != 'image');
    return images.length;
  };

  return (
    <FancyBox
      options={{
        Carousel: {
          infinite: false,
        },
      }}
      setFancyboxIsActive={setFancyboxIsActive}
    >
      <div className="row" key={item.key}>
        {item.map((item: any, index: any) => {
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

          const videoPath = getVideoPath(item);

          return (
            <React.Fragment key={index}>
              {item?.featuredMedia != undefined ? (
                <div className="col-12 col-md-6 col-xl-4">
                  <div className="c-card d6">
                    <GalleryMapping item={item}>
                      <div className="ratio ratio-16x9">
                        <Image
                          src={`/nilp${item.featuredMedia.cdnPath}`}
                          className="img-fluid"
                          alt={item.title}
                          width={800}
                          height={600}
                        />
                      </div>
                      <span className="c-card_media_counts">
                        <span className="pe-2">
                          {`${getImageCount(item.media)} ${
                            getImageCount(item.media) === 1 ? `${t('global.photo')}` : `${t('global.photos')}`
                          }`}
                        </span>
                        <span>{`${getVideoCount(item.media)} ${
                          getVideoCount(item.media) === 1 ? `${t('global.video')}` : `${t('global.videos')}`
                        }`}</span>
                      </span>
                      <div className="c-card__label">{item.title}</div>
                      <div className="c-card__button card-footer">
                        <Button color="primary" varient="solid" radius="md">
                          {t('global.viewMore')}
                        </Button>
                        <div className="gc d6 bold card-span">
                          <div className="gc__content">
                            <span> {t('global.published')}: </span>
                            {formatDate}
                          </div>
                        </div>
                      </div>
                    </GalleryMapping>
                  </div>
                </div>
              ) : (
                <div className="col-12 col-md-6 col-xl-4">
                  <div className="c-card d6 radius">
                    {item.type == 'image' ? (
                      <Link
                        className="ratio ratio-16x9"
                        data-fancybox="gallery"
                        href={item.cdnPath}
                      >
                        <Image
                          src={`/nilp${item.cdnPath}`}
                          className="img-fluid"
                          alt={item.title}
                          width={800}
                          height={600}
                        />
                      </Link>
                    ) : item.type == 'youtube' ? (
                      <div className="ratio ratio-16x9">
                        <iframe
                          width="100%"
                          height="254"
                          src={`https://www.youtube.com/embed/${videoPath}`}
                          title="Secretary, DoSEL, MoE- Speech Inauguration (ULLAS Mela)"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          style={{ borderRadius: '20px' }}
                        ></iframe>
                      </div>
                    ) : (
                      <div className="ratio ratio-16x9">
                        <iframe
                          width="100%"
                          height="254"
                          src={item.cdnPath}
                          title="Secretary, DoSEL, MoE- Speech Inauguration (ULLAS Mela)"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          style={{ borderRadius: '20px' }}
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </FancyBox>
  );
};

export default PhotoModal;
