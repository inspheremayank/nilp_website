'use client';
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { TWOFACTORSLIDERPORTAL } from '@/config/config';

export default function AuthenticationInstructionsPortalSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    verticalSwiping: false,
    autoplay: true,
    arrows: true,
    appendDots: (dots: any) => (
      <div className="custom-dots">
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: (i: any) => (
      <div className="custom-dot">
        <span className="">0{i + 1}</span>
      </div>
    ),
  };

  return (
    <>
      <div className="c-innerBanner v2 empty_box"></div>

      <div className="two-factor-bannerSlide">
        <h3 className="title">Two-Factor Authentication Instructions</h3>
        <div className="container custom_container">
          <div className="row">
            <div className="col-12">
              <Slider {...settings}>
                {TWOFACTORSLIDERPORTAL.map((item: any, index: number) => {
                  return (
                    <div className="slider-item-container" key={index}>
                      <div className="hw d4 slider-text">
                        <div className="hw__title">
                          <span> Step {index + 1}-:</span>
                          {item.heading}
                        </div>
                      </div>
                      <div className="slider-item-container__image">
                        <Image
                          width={1919}
                          height={868}
                          src={item.img}
                          alt="step1"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
