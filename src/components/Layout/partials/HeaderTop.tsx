import { APPIMAGES } from '@/config/config';
import Image from 'next/image';
import LanguageSwitcher from './../LanguageSwitcher';

const HeaderTop = () => {
  return (
    <>
      <div className="c-header__top">
        <div className="container-fluid">
          <div className="row d-md-none">
            <div className="col-12 p-0">
              <div className='c-header__top_resp_box'>
                <div
                  className="c-header__top_animation"
                  style={{ backgroundImage: `url("/nilp/images/res_logo.svg")` }}
                ></div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
        <div className="container custom_container">
          <div className="row d-none d-md-flex">
            <div className="col-12 col-md-6">
              <div className="c-header__top_info">
                <ul>
                  <li>
                    <span>भारत सरकार</span>
                    <span>Government of India</span>
                  </li>
                  <li>
                    <span>शिक्षा मंत्रालय</span>
                    <span>Ministry of Education</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="c-header__top_logos">
                <Image src={APPIMAGES.IMG2} width={69} height={48} alt="logo" />
                <Image
                  src="/nilp/images/logos/school_edu_logo.svg"
                  width={234}
                  height={48}
                  alt="logo"
                />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
