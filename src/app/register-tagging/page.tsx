import type { Metadata } from 'next';

import DynamicTabs from '@/utlis/DynamicTabs';
import Link from 'next/link';
import Image from 'next/image';
import TaggingVolunteer from '@/elements/RegistrationProcess/partials/TaggingVolunteer';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Register & Tagging | ULLAS',
  description: 'ULLAS',
};

const Register = ({ searchParams }: any) => {
  const t = useTranslations();

  const tabsInfo = [
    {
      label: `${t('global.registrationVT&Learner')}`,
      key: 'registration',
    },
    {
      label: `${t('global.taggingVT')}`,
      key: 'tagging',
    },
  ];

  return (
    <>
      <div className="c-innerBanner v2 empty_box"></div>
      <main className="c-body_container">
        <div className="container custom_container">
          <div className="row">
            <div className="col-12">
              <div className="c-card d8 cmt-20 cmb-20">
                <DynamicTabs data={tabsInfo} varient={'d4'}>
                  {searchParams.tab == 'registration' ||
                  searchParams.tab == undefined ? (
                    <div className="c-card d7">
                      <div className="gc d3 text-center">
                        <p className="gc__content">
                          {t('global.registerSchool')}
                        </p>

                        <div className="c-card d9 my-4">
                          <Link
                            href="/register?tab=school"
                            className="c-card__item"
                          >
                            <span>
                              <Image
                                src="/nilp/images/icons/register_school.svg"
                                alt="icon"
                                width={42}
                                height={42}
                                className="me-3"
                              />
                            </span>
                            <span>{t('global.selectSchool')}</span>
                          </Link>
                          {/* <Link
                            href="register?tab=direct"
                            className="c-card__item"
                          >
                            <span>
                              <Image
                                src="/nilp/images/icons/register_direct.svg"
                                alt="icon"
                                width={42}
                                height={42}
                                className="me-3"
                              />
                            </span>
                            <span>{t('global.registerDirectly')}</span>
                          </Link> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <TaggingVolunteer />
                  )}
                </DynamicTabs>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
