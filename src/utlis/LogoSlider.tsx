'use client';
import { FC } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';

const LogoSlider: FC<{ data: any }> = ({ data }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
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
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="mt-2 logos_wrap">
        <div className="container custom_container">
          <div className="row">
            <div className="col-12">
              <Slider {...settings}>
                {data.length > 0 &&
                  data
                    .filter((items: any) => items.props !== undefined)
                    .map((logos: any) => (
                      <div className="c-card d3" key={logos.key}>
                        <Link href={logos.props.link ?? ""} target="_blank">
                        <Image
                          src={logos.props.src}
                          alt={logos.props.alt}
                          className="img-fluid"
                          width={500}
                          height={100}
                        /></Link>
                      </div>
                    ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoSlider;
