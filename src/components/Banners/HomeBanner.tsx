'use client';
import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import Slider from 'react-slick';
import Marquee from 'react-fast-marquee';
import Button from '../Button';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { APPIMAGES } from '@/config/config';
import { GET_POST_ENDPOINT } from '@/config/apiConfig';
import { getRequestClientSide } from '@/services/getServerSideRender';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const HomeBanner = (props: any) => {
  const pathname = usePathname();
  const t = useTranslations();
  const router = useRouter();
  const [pageData, setPageData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nav1, setNav1] = useState<Slider | undefined>();
  const [nav2, setNav2] = useState<Slider | undefined>();
  const slider1 = useRef<Slider>(null);
  const slider2 = useRef<Slider>(null);
  const slider3 = useRef<Slider>(null);

  // Main Slider fetch request
  useEffect(() => {
    const getPageData = async () => {
      console.log(process.env.NEXT_PUBLIC_BASE_URL, 'url');
      const data = await getRequestClientSide(
        `${GET_POST_ENDPOINT}?slug=home-banner`,
        localStorage.getItem('locale')
      );
      if (data !== undefined) {
        setPageData(data);
      }
    };
    getPageData();
  }, [pathname, t]);

  // slider code started

  var settingsFor = {
    dots: false,
    infinite: true,
    arrows: false,
    fade: true,
    swipeToSlide: false,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  var settingsNav = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    focusOnSelect: true,
    swipeToSlide: true,
    beforeChange: (current: any, next: any) => setCurrentSlide(next - 1),

    responsive: [
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  useEffect(() => {
    slider2.current && setNav2(slider2.current);
    slider3.current && setNav1(slider3.current);
  }, []);

  useEffect(() => {
    slider1.current && slider1.current.slickGoTo(currentSlide);
  }, [currentSlide]);
  return (
    <>
      <div className="banner_wrapper">
        <div className="container custom_container">
          <div className="row">
            <div className="col-12">
              <div className="banner_wrapper_indiaImg">
                <Image
                  src={APPIMAGES.ICON6}
                  alt="india Image"
                  width={0}
                  height={0}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              {pageData && pageData.length > 0 && (
                <Slider
                  asNavFor={nav2}
                  initialSlide={0}
                  ref={slider1}
                  {...settingsFor}
                >
                  {pageData.map((item: any) => {
                    return (
                      <div key={item.id}>
                        <div className="row">
                          <div className="col-12 col-lg-6">
                            <div className="banner_wrapper_container">
                              <div className="banner_wrapper_content">
                                <div className="hw d1">
                                  <h1 className="hw__title">{item.title}</h1>
                                </div>
                                <p>{item.content}</p>
                                {item.metaInfo && item.metaInfo.link !== '' && (
                                  <Button
                                    color="secondary"
                                    clickHandler={() =>
                                      router.push(item.metaInfo.link)
                                    }
                                  >
                                    {t('global.readMore')}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            {item.media[0].type == 'image' && (
                              <div className="banner_wrapper_image">
                                <div className="banner_wrapper_image_container ratio ratio-4x3">
                                  <Image
                                    src={item.media[0].cdnPath}
                                    alt="images"
                                    width={620}
                                    height={585}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>

        <div className="container-fluid banner_subWrap">
          <div className="row">
            <div className="col-12 col-lg-6 banner_subWrap__content p-0">
              <Slider
                asNavFor={nav2}
                initialSlide={1}
                ref={slider3}
                {...settingsFor}
              >
                {pageData.map((item: any) => {
                  return (
                    <div key={item.id} className="banner_subWrap__container">
                      <div className="banner_subWrap__text">
                        <h1>{item.title}</h1>
                        <p>{item.content}</p>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="col-12 col-lg-6 banner_subWrap__slides p-0">
              <Slider
                asNavFor={nav1}
                initialSlide={1}
                ref={slider2}
                {...settingsNav}
              >
                {pageData.map((item: any) => {
                  return (
                    <div key={item.id} className="banner_subWrap__image">
                      {item.media[0].type == 'image' && (
                        <Image
                          src={item.media[0].cdnPath}
                          alt="images"
                          width={620}
                          height={585}
                        />
                      )}
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="marquee_wrapper">
        <div className="container custom_container">
          <div className="row">
            <div className="col-12">
              <div className="marquee_wrapper_container">
                <div className="marquee_wrapper_label">
                  {t('global.whatsNew')}
                </div>
                <Image
                  src="nilp/images/icons/icon_14.svg"
                  width={70}
                  height={27}
                  alt="circles"
                  className="marquee_wrapper_icon px-2"
                />
                <div className="marquee_wrapper_content">
                  <Marquee pauseOnHover={true}>
                    <strong className="ps-4 pe-4">
                      {t('global.notice')} :{' '}
                    </strong>
                    {t('global.whatsNewTextNotice')}
                  </Marquee>
                </div>
                <Image
                  src="nilp/images/icons/icon_14.svg"
                  width={70}
                  height={27}
                  alt="circles"
                  className="marquee_wrapper_icon px-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
