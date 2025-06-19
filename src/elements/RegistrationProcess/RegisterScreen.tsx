'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

import RegisterSchool from '@/elements/RegistrationProcess/partials/RegisterSchool';
import RegisterTabs from '@/elements/RegistrationProcess/partials/RegisterTabs';
import Button from '@/components/Button';

const RegisterScreen = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const search = searchParams.get('tab');
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  return (
    <>
      {isRegisterSuccess ? (
        <div className="text-center cmt-20 cmb-20">
          <div className="hw d2 cmb-20">
            <div className="hw__title">{t('global.thankyou')}</div>
          </div>

          <Link href="/">
            <Button color="primary" varient="solid">
              {t('global.home')}
            </Button>
          </Link>
          <Link href="/register-tagging?tab=registration" className='ms-3'>
            <Button color="primary" varient="solid">
              {t('global.registerAgain')}
            </Button>
          </Link>
        </div>
      ) : search == 'school' || search == undefined ? (
        <main className="c-body_container">
          <div className="container custom_container">
            <div className="row">
              <div className="col-12">
                <div className="c-card d8 cmt-20 cmb-20">
                  <div className="tabbing_wrap d4">
                    <ul>
                      <li>
                        <div className="tabbing_wrap_item active text-center">
                          {t('global.registrationVT&Learner')}
                        </div>
                      </li>
                    </ul>
                    <RegisterSchool registerSuccess={setIsRegisterSuccess} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="c-body_container">
          <div className="container custom_container">
            <div className="row">
              <div className="col-12">
                <div className="c-card d8 d8--breakup cmt-20 cmb-20">
                  <div className="tabbing_wrap d4">
                    <RegisterTabs registerSuccess={setIsRegisterSuccess} showAllField={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default RegisterScreen;
