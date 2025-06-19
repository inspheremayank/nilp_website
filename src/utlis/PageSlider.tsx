'use client';
import Image from 'next/image';
import Slider from 'react-slick';

type mediaType = {
  media: mediaInfoTypes;
};

type mediaInfoTypes = {
  type: string;
  cdnPath: string;
  caption?: string;
}[];
const PageSlider = ({ media }: mediaType) => {
  var settings = {
    dots: false,
    arrows:false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {media.map((item: any, index: number) => (
        <div className="ratio ratio-16x9 d-flex c-card__image" key={index}>
          <Image src={item.cdnPath} alt={item.type} width={600} height={450} />
        </div>
      ))}
    </Slider>
  );
};

export default PageSlider;
