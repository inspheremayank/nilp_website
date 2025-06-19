'use client';
import Marquee from 'react-fast-marquee';

const MarqueeComp = (props: any) => {
  const data = props.data;

  return (
    <>
      <Marquee
        pauseOnHover={
          props.pauseOnHover !== undefined && props.pauseOnHover !== ''
            ? props.pauseOnHover
            : false
        }
        direction={
          props.direction !== undefined && props.direction !== ''
            ? props.direction
            : 'left'
        }
        delay={
          props.delay !== undefined && props.delay !== '' ? props.delay : 0
        }
        speed={
          props.speed !== undefined && props.speed !== '' ? props.speed : 50
        }
      >
        {data.length > 0 &&
          data
            .filter((items: any) => items.props !== undefined)
            .map((marItem: any) => {
              return (
                <div key={marItem.key} className="map_wrapper">
                  {marItem.props.children}
                </div>
              );
            })}
      </Marquee>
    </>
  );
};
export default MarqueeComp;
