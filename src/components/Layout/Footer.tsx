import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { getTranslations } from 'next-intl/server';
import { APPIMAGES } from '@/config/config';
import { CONSTANTS } from '@/config/constant';
import { getRequestServerSide } from '@/services/getServerSideRender';
import { GET_MENU_ENDPOINT } from '@/config/apiConfig';
import { ERRORS } from '@/config/error';
import VisitorCounts from '../VisitorCounts';
import MailButton from '../MailButton';

async function getAPIRequest(slug: string) {
  const response = await getRequestServerSide(
    `${GET_MENU_ENDPOINT}?slug=${slug}`,
    cookies().get('locale')?.value
  );

  return response;
}

async function getData(data: string) {
  const dataPromise = getAPIRequest(data);
  const response = await dataPromise;
  if (response.gettingError !== undefined) {
    if (response.gettingError == ERRORS.ERR_BAD_REQUEST) {
      throw notFound();
    }
  } else {
    return response;
  }
}

export default async function Footer() {
  const t = await getTranslations('footer');
  const footerQuickMenu = await getData(CONSTANTS.FOOTER_QUICK_MENU_SLUG);
  const footerOtherMenu = await getData(CONSTANTS.FOOTER_OTHER_MENU_SLUG);
  const footerBottomMenu = await getData(CONSTANTS.FOOTER_BOTTOM_MENU_SLUG);

  return (
    <>
      {footerQuickMenu.length > 0 && footerOtherMenu.length > 0 && (
        <footer className="c-footer">
          <div className="c-footer_top">
            <div className="container custom_container">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="c-footer_top_info">
                    <div className="c-footer_top_info_logo">
                      <Image
                        alt="logo"
                        width={300}
                        height={86}
                        className="img-fluid"
                        src="/nilp/images/logos/logo.svg"
                      />
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-10 col-xl-9 mb-4 mb-md-0">
                        <div className="c-footer_top_info_content mt-4">
                          <p>{t('description')}</p>
                        </div>
                        <div className="d-flex">
                          <Link
                            href="https://www.facebook.com/people/ULLAS-Nav-Bharat-Saaksharta-Karyakram/100092449066375/"
                            target="_blank"
                            className="d-block"
                          >
                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 21 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.8421 10.484C20.8414 4.6938 16.1764 0 10.421 0C4.6657 0 0 4.6945 0 10.4854C0 15.698 3.78037 20.0219 8.73238 20.8337L8.79215 20.8421V13.5158H6.14588V10.484H8.79215V8.17518C8.77894 8.05841 8.77199 7.92276 8.77199 7.78572C8.77199 5.74192 10.419 4.08479 12.4502 4.08479C12.5482 4.08479 12.6455 4.08899 12.7421 4.09598L12.7296 4.09528C13.5628 4.10717 14.3689 4.18128 15.1555 4.31343L15.0624 4.30015V6.88024H13.7476C13.6879 6.87185 13.6191 6.86695 13.5496 6.86695C12.7178 6.86695 12.043 7.54519 12.043 8.38284C12.043 8.43039 12.0451 8.47724 12.0492 8.52408L12.0485 8.51779V10.484H14.9387L14.4766 13.5158H12.0485V20.8421C17.061 20.0212 20.8414 15.6966 20.8421 10.484Z"
                                fill="white"
                              />
                            </svg>
                          </Link>
                          <Link
                            href="https://www.youtube.com/@ULLAS-MoE"
                            target="_blank"
                            className="ms-3 d-block"
                          >
                            <svg
                              width="30"
                              height="21"
                              viewBox="0 0 30 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.1206 14.8174V6.02768L19.8789 10.423L12.1206 14.8174ZM29.3771 3.26076C29.0267 1.97834 28.037 0.986707 26.7791 0.63579L26.7524 0.629876C23.5923 0.229673 19.9373 0.00098565 16.2279 0.00098565C15.8508 0.00098565 15.4747 0.00295706 15.0996 0.00788567L15.157 0.00690002C14.8383 0.00295713 14.4632 0 14.0862 0C10.3768 0 6.7198 0.228687 3.13015 0.671276L3.55968 0.627904C2.27603 0.985721 1.28633 1.97637 0.942902 3.23316L0.936964 3.25879C0.541082 5.33768 0.31543 7.73002 0.31543 10.1746C0.31543 10.2614 0.31543 10.3481 0.316419 10.4339V10.4201C0.316419 10.493 0.31543 10.5797 0.31543 10.6665C0.31543 13.1111 0.542072 15.5024 0.974572 17.8218L0.936964 17.5813C1.28732 18.8637 2.27702 19.8554 3.53494 20.2063L3.56166 20.2122C6.72178 20.6124 10.3768 20.8411 14.0862 20.8411C14.4623 20.8411 14.8383 20.8391 15.2144 20.8342L15.157 20.8352C15.4757 20.8391 15.8518 20.8421 16.2279 20.8421C19.9383 20.8421 23.5943 20.6134 27.1839 20.1708L26.7544 20.2142C28.039 19.8574 29.0287 18.8657 29.3731 17.6089L29.3791 17.5833C29.774 15.5044 29.9996 13.1121 29.9996 10.6685C29.9996 10.5817 29.9996 10.495 29.9986 10.4092V10.422C29.9986 10.3491 29.9996 10.2623 29.9996 10.1756C29.9996 7.73101 29.773 5.33965 29.3405 3.02025L29.3771 3.26076Z"
                                fill="white"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="row justify-content-end">
                    <div className="col-6 col-md-3 mb-4 mb-md-0">
                      {footerQuickMenu.length > 0 && (
                        <div className="c-footer_top_info_content">
                          <h3 className="heading">{t('quick-links')}</h3>
                          <div className="c-navigation c-navigation_2">
                            {footerQuickMenu.length > 0 &&
                              footerQuickMenu.map((item: any) => {
                                return (
                                  <Link
                                    key={item.id}
                                    href={item.link.replace('.html', '')}
                                    className="c-navigation_item"
                                    target={
                                      item.isExternal == 1 ? '_blank' : '_self'
                                    }
                                  >
                                    {item.name}
                                  </Link>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-6 col-md-3 mb-4 mb-md-0">
                      {footerOtherMenu.length > 0 && (
                        <div className="c-footer_top_info_content">
                          <h3 className="heading">{t('other-links')}</h3>
                          <div className="c-navigation c-navigation_2">
                            {footerOtherMenu.length > 0 &&
                              footerOtherMenu.map((item: any) => {
                                return (
                                  <Link
                                    key={item.id}
                                    href={item.link.replace('.html', '')}
                                    className="c-navigation_item"
                                    target={
                                      item.isExternal == 1 ? '_blank' : '_self'
                                    }
                                  >
                                    {item.name}
                                  </Link>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-6 col-md-3 mb-4 mb-md-0">
                      <div className="c-footer_top_info_content">
                        <h3 className="heading">{t('contacts')}</h3>
                      </div>
                      <div className="d-flex">
                        <Link href="/contact-us" className="d-block">
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.9356 13.9816L17.4421 14.4721C17.4421 14.4721 16.2693 15.6383 13.068 12.4551C9.8668 9.27209 11.0396 8.10595 11.0396 8.10595L11.3503 7.797C12.1158 7.03591 12.1879 5.81399 11.5201 4.92194L10.154 3.09717C9.32748 1.99308 7.7303 1.84723 6.78291 2.78923L5.08251 4.47998C4.61276 4.94707 4.29796 5.55256 4.33614 6.22424C4.4338 7.94264 5.21127 11.6399 9.54965 15.9536C14.1503 20.5281 18.467 20.7099 20.2323 20.5454C20.7907 20.4934 21.2762 20.209 21.6675 19.8199L23.2065 18.2897C24.2453 17.2568 23.9524 15.486 22.6232 14.7635L20.5535 13.6384C19.6808 13.164 18.6176 13.3033 17.9356 13.9816Z"
                              fill="white"
                            />
                          </svg>
                        </Link>
                        <MailButton />
                      </div>
                    </div>
                    <div className="col-6 col-md-3">
                      <div className="c-footer_top_info_content">
                        <h3 className="heading">{t('download-app')}</h3>
                        <div className="">
                          <Link
                            href="https://apps.apple.com/in/app/ullas/id6447245653"
                            target="_blank"
                            className="d-block"
                          >
                            <Image
                              src={APPIMAGES.ICON10}
                              alt="store"
                              width={140}
                              height={45}
                            />
                          </Link>
                          <Link
                            href="https://play.google.com/store/apps/details?id=com.np.nilp&hl=en_ZA"
                            target="_blank"
                            className="mt-2 d-block"
                          >
                            <Image
                              src={APPIMAGES.ICON12}
                              alt="store"
                              width={140}
                              height={45}
                            />
                          </Link>
                        </div>
                        <div className="visitors_counter">
                          {t('total-visitors')}
                          <span>
                            <VisitorCounts />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="c-footer_bottom">
            <div className="container custom_container">
              <div className="row">
                <div className="col-12">
                  <div className="c-footer_bottom_container">
                    <div className="c-footer_bottom_copy">
                      © {t('copyright')}
                    </div>
                    <div className="c-navigation c-navigation_1">
                      {footerBottomMenu.length > 0 &&
                        footerBottomMenu.map((item: any) => {
                          return (
                            <Link
                              key={item.id}
                              href={item.link.replace('.html', '')}
                              className="c-navigation_item"
                              target={item.isExternal == 1 ? '_blank' : '_self'}
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
