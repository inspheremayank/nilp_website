'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface ModalProps {
  cls?: string;
  heading: string;
  children: any;
  action: any;
  timer?:any;
}

const Modal: React.FC<ModalProps> = ({ cls, heading, children, action, timer }) => {
  const router = useRouter();
  useEffect(() => {
    if(timer && timer.status == true) {
      setTimeout(() => {
        router.push(timer.url);
      },timer.time);
    }
  },[])
  const modalClass = cls != undefined && cls != '' ? cls : 'd4';
  return (
    <>
      <div className={`u-loader ${modalClass}`}>
        <div className="u-loader_overlay" onClick={() => action()}></div>
        <div className="u-loader_container">
          <div className="u-loader_head">
            <button className="u-loader_close" onClick={() => action()}>
              <Image 
              src="/nilp/images/icons/close.svg" 
              width={30}
              height={30}
              alt="close icon" 
              className="img-fluid" />
            </button>
            <div className="hw d4">
              <div className="hw__title">{heading}</div>
            </div>
          </div>
          <div className="u-loader_body text-start">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
