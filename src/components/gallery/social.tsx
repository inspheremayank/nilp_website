
'use client'
import { useTranslations } from 'next-intl';
import { AppContext } from '@/context/AppContext';
import Link from 'next/link';
import { useContext } from 'react';

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
  };
}

interface Props {
  videos?: Video[];
  limit?: number;
}

export default function Social({ limit }: Props) {
  const t = useTranslations();
  const contentInfo = useContext(AppContext);
  const video = contentInfo.youtubeVideo;
  const parsedLimit = typeof limit === 'number' ? limit : video.length;

  return (
    <div className="c-boxContainer cmb-20">
      <div className="content row">
        <div className="col-12 col-lg-7 col-xl-8 mb-2 mb-lg-0">
          <div className="video-section c-card d5">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="hw d7">
                <h5 className="hw__title">{t('global.youtube')}</h5>

              </div>
              <Link
                href="https://www.youtube.com/@ULLAS-MoE"
                target="_blank"
                className="u-button danger solid size-sm radius-sm"
              >
                {t('global.goToChannel')}
              </Link>
            </div>
            <div
              className="row justify-content-between"
              style={{ maxHeight: '600px', overflowY: 'auto', margin: '5px' }}
            >
              {video?.slice(0, parsedLimit).map((video: any, index: number) => {
                const id = video?.id?.videoId;
                if (!id) return null;

                return (
                  <div key={index} className="box1 col-md-6 mb-2 my-3">
                    <iframe
                      className="rounded"
                      width="100%"
                      height="254"
                      src={`https://www.youtube.com/embed/${id}`}
                      title={video.snippet.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5 col-xl-4">
          <div className="facebook-add c-card d5 ">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="hw d7">
                <h5 className="hw__title">{t('global.facebook')}</h5>
              </div>
              <Link
                href="https://www.facebook.com/people/ULLAS-Nav-Bharat-Saaksharta-Karyakram/100092449066375/"
                className="u-button dark-tertiary solid size-sm radius-sm"
                target="_blank"
              >
                {t('global.visitPage')}
              </Link>
            </div>

            <div className="my-3">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F100092449066375&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="340"
                height="500"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                className="img-fluid"
                style={{ minHeight: '500px' }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
