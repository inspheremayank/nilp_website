'use client';
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';

const Process = (props: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const data = props.data;

  var settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipe: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          infinite: true,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 15000,
          swipe: true,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: true,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 5000,
          swipe: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          infinite: true,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 5000,
          swipe: true,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          infinite: true,
          autoplay: true,
          speed: 2000,
          autoplaySpeed: 5000,
          swipe: true,
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [activeIndex]);

  return (
    <div className="c-process">
      <ul>
        <Slider {...settings}>
          {data.length > 0 &&
            data
              .filter((items: any) => items.props !== undefined)
              .map((item: any, index: number) => {
                return (
                  <React.Fragment key={item.key}>
                    <li
                      key={item.key}
                      className={`c-process__link ${activeIndex >= index ? 'active' : ''}`}
                    >
                      <div className="c-process__top">
                        <div className="c-process__count">
                          {index < 10 ? '0' + (index + 1) : index + 1}
                        </div>
                        <div className="c-process__label">
                          {item.props.label}
                        </div>
                        <div className="c-process__description">
                          {item.props.children}
                        </div>
                      </div>
                      <div className="c-process__bottom">
                        <div className="c-process__bottom_icon"></div>
                        <Image
                          src={item.props.icon}
                          alt="image"
                          width={80}
                          height={80}
                        />
                      </div>
                    </li>
                  </React.Fragment>
                );
              })}
        </Slider>
      </ul>
    </div>
  );
};

export default Process;
