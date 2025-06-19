import Breadcumb from '../Breadcumb';
import Image from 'next/image';

const InnerBanner = ({ pageData }: any) => {
  return (
    <>
      <div className="c-innerBanner v2">
        <div className="container">
          <div className="row">
            <div className="row">
              <div className="c-innerBanner_wrapper">
                <Breadcumb data={pageData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerBanner;
