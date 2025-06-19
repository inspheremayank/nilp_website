'use client';
import { useState, useEffect, MutableRefObject, useRef, useContext } from 'react';
import Image from 'next/image';
import { APPIMAGES } from '@/config/config';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { CONSTANTS } from '@/config/constant';
import Button from '@/components/Button';
import CustomModal from '@/components/modals/CustomModal';
import { AppContext } from '@/context/AppContext';
import ullasBanner from '/public/images/ullas-banner-3.webp'
import ullasBannerMini from '/public/images/ullas-banner-mini-3.webp'

const HeaderMain: React.FC<{ menu: any, youtubeVideos:any}> = ({ menu,youtubeVideos }) => {
  const router = useRouter();
  const t = useTranslations();

  const headerMenu = menu;

  const [responsiveMenu, setResponsiveMenu] = useState(false);
  const menuRef = useRef() as MutableRefObject<HTMLDivElement>;
  const {alertModal,handleClose,handleShowAgain} = useContext(AppContext)
  const {setYouTubeVideos } = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setResponsiveMenu(false);
        document.body.classList.remove('overflow-hidden');
      }
    };

    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, [responsiveMenu]);

  const pathName = usePathname();

  useEffect(()=>{
  setYouTubeVideos(youtubeVideos)
},[youtubeVideos])

  return (
    <>
      <div className={`c-header__main`}>
        <div className="container custom_container">
          <div className="row">
            <div className="col-12">
              <div className="c-header__main_container">
                <div className="c-header__main_container_logo">
                  <Link href="/">
                    <img src={APPIMAGES.IMG5} alt='ullas logo' style={{width:'150px', height:'55px'}} />
                  </Link>
                </div>
                <div
                  className={`c-header__main_nav ${responsiveMenu ? 'active' : ''}`}
                >
                  <div className="c-header__main_nav_overlay"></div>
                  <div className="c-header__main_nav_wrapper" ref={menuRef}>
                    <nav className="c-navigation c-navigation_3">
                      {headerMenu.length > 0 && (
                        <ul>
                          <li
                            className="c-navigation_list d-lg-none"
                            onClick={() => {
                              document.body.classList.remove('overflow-hidden');
                              setResponsiveMenu(false);
                            }}
                          >
                            <Link className={`c-navigation_item`} href="/">
                              {t('global.home')}
                            </Link>
                          </li>
                          {headerMenu.map((item: any) => {
                            const path = item.link.split('.html');

                            const isActive =
                              pathName.startsWith(path[0]) ||
                              (pathName.includes(
                                CONSTANTS.CONCISE_PRIMER_URL
                              ) &&
                                item.id == 2);

                            return (
                              <li
                                className="c-navigation_list"
                                key={item.id}
                                onClick={() => {
                                  document.body.classList.remove(
                                    'overflow-hidden'
                                  );
                                  setResponsiveMenu(false);
                                }}
                              >
                                <Link
                                  className={`c-navigation_item ${isActive ? 'active-link-class' : ''}`}
                                  href={item.link.replace('.html', '')}
                                  target={
                                    item.isExternal == 1 ? '_blank' : '_self'
                                  }
                                >
                                  {t(item.name)}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </nav>
                    <div className="c-header__main_nav_btns u-button_group ms-4">
                      <Button
                        varient="bordered"
                        color="gradient"
                        clickHandler={() =>
                          window.open('https://ullas.education.gov.in/portal','_blank')
                        }
                      >
                        {t('global.login')}
                      </Button>
                      <Button
                        varient="solid"
                        color="gradient"
                        size="sm"
                        clickHandler={() => router.push('/register-tagging?tab=registration')}
                      >
                        {t('global.register-tagging')}
                      </Button>
                    </div>
                  </div>
                  <div className="c-header__main_mob_nav">
                    <Link
                      href="https://nilp.education.gov.in/portal/#/login "
                      className="c-header__main_mob_nav_icon user"
                      target="_blank"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.9999 16.6666C23.6818 16.6666 26.6666 13.6818 26.6666 9.99992C26.6666 6.31802 23.6818 3.33325 19.9999 3.33325C16.318 3.33325 13.3333 6.31802 13.3333 9.99992C13.3333 13.6818 16.318 16.6666 19.9999 16.6666Z"
                          stroke="#1C274C"
                          strokeWidth="2"
                        />
                        <path
                          d="M33.3334 29.1667C33.3334 33.3089 33.3334 36.6667 20.0001 36.6667C6.66675 36.6667 6.66675 33.3089 6.66675 29.1667C6.66675 25.0246 12.6363 21.6667 20.0001 21.6667C27.3639 21.6667 33.3334 25.0246 33.3334 29.1667Z"
                          stroke="#1C274C"
                          strokeWidth="2"
                        />
                      </svg>
                    </Link>
                    <Link
                      href="/register-tagging"
                      className="c-header__main_mob_nav_icon register"
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26.6667 6.66992C30.2917 6.69011 32.2548 6.85086 33.5355 8.13149C35 9.59596 35 11.953 35 16.667V26.667C35 31.381 35 33.7382 33.5355 35.2025C32.071 36.667 29.714 36.667 25 36.667H15C10.2859 36.667 7.92893 36.667 6.46447 35.2025C5 33.7382 5 31.381 5 26.667V16.667C5 11.953 5 9.59596 6.46447 8.13149C7.7451 6.85086 9.70828 6.69011 13.3333 6.66992"
                          stroke="#1C274C"
                          strokeWidth="2"
                        />
                        <path
                          d="M13.3333 23.3333H26.6666"
                          stroke="#1C274C"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M11.6667 17.5H28.3334"
                          stroke="#1C274C"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M15 29.1667H25"
                          stroke="#1C274C"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M13.3333 5.83325C13.3333 4.45254 14.4525 3.33325 15.8333 3.33325H24.1666C25.5473 3.33325 26.6666 4.45254 26.6666 5.83325V7.49992C26.6666 8.88064 25.5473 9.99992 24.1666 9.99992H15.8333C14.4525 9.99992 13.3333 8.88064 13.3333 7.49992V5.83325Z"
                          stroke="#1C274C"
                          strokeWidth="2"
                        />
                      </svg>
                    </Link>
                    <Link href="#" className="c-header__main_mob_nav_icon menu">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setResponsiveMenu(true);
                          document.body.classList.add('overflow-hidden');
                        }}
                      >
                        <path
                          d="M33.3334 11.6667H6.66675"
                          stroke="#1C274C"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M33.3334 20H6.66675"
                          stroke="#1C274C"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M33.3334 28.3333H6.66675"
                          stroke="#1C274C"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    {!alertModal &&
            <div className="accessibility__arrowBtn" onClick={handleShowAgain} style={{ left: "20px", bottom: "75px", right: "unset" ,cursor:"pointer",position:"fixed"}}>
              <Image className="border img-fluid" src={ullasBannerMini} height={60} width={120} alt="alert image" />
            </div>
          }
      <CustomModal isOpen={alertModal} backdrop={true} className="alertModal modal-xl" header={false}>
          <>
            <button className="btn modalClosebtn" type="button" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fff" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
              </svg>
            </button>
            <Image src={ullasBanner} width={1080} height={540} alt="alert image" className="img-fluid" />
          </>
        </CustomModal>
    </>
  );
};

export default HeaderMain;
