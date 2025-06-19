import Image from 'next/image';
import Button from '../Button';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ConfirmationModal = ({
  heading,
  message,
  handleClick,
  customButton,
  customButton2,
  customButtonUrl,
  customButton2Url
}: any) => {
  const router = useRouter();

  const [isShow, setIsShow] = useState(true);

  return (
    <>
      {isShow && (
        <>
          <div className="u-loader d3">
            <div className="u-loader_overlay"></div>
            <div className="u-loader_container">
              <div className="hw d6">
                <div className="hw__title">{heading}</div>
              </div>
              <div className="gc d3 cmb-60 custom-color">
                <div className="gc__content">{message}</div>
              </div>
              <div className="cmb-40 img-fluid">
                <Image
                  src="/nilp/images/confirm.gif"
                  alt="confirm"
                  width={150}
                  height={150}
                  className="img-fluid"
                />
              </div>
              <div
                className="row"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="col-12 col-md-4">
                  <Link href={customButtonUrl}>
                  <Button
                    type="button"
                    color="gradient"
                    size="w-100"
                    clickHandler={() => {
                      handleClick();
                      setIsShow(!isShow);
                    }}
                  >
                    {customButton}
                  </Button>
                  </Link>
                </div>

                {customButton2 && (
                  <div className="col-12 col-md-8 mt-2 mt-md-0">
                    <Link href={customButton2Url}>
                    <Button
                      type="button"
                      color="gradient"
                      varient="bordered"
                      size="w-100"
                      clickHandler={() => setIsShow(!isShow)}
                    >
                      {customButton2}
                    </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ConfirmationModal;
