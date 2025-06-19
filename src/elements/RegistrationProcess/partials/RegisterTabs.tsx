'use client';

import { useState } from 'react';
import RegisterVtForm from './RegisterVtForm';
import RegisterLearnerForm from './RegisterLearnerForm';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';

const RegisterTabs = ({
  registerSuccess,
  showAllField,
  state,
  district,
  school
}: any) => {
  const [registrationState, setRegistrationState] = useState('learner');
  const searchParams = useSearchParams();
  const isCurrentUrl = searchParams.get('tab') === 'direct';

  const t = useTranslations();
  const router = useRouter();

  const handleBack = () => {
    router.push('/register-tagging?tab=registration');
  };
  return (
    <>
      <ul>
        <li>
          <button
            onClick={() => setRegistrationState('learner')}
            className={`tabbing_wrap_item  ${registrationState == 'learner' ? 'active' : ''}`}
          >
            <span className="circle"></span>
            <span>{t('global.learnerForm')}</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setRegistrationState('vt')}
            className={`tabbing_wrap_item  ${registrationState == 'vt' ? 'active' : ''}`}
          >
            <span className="circle"></span>
            <span>{t('global.vtForm')}</span>
          </button>
        </li>
      </ul>
      <div className="c-card d7">
        {isCurrentUrl && (
         <div className='text-end cmb-20'>
           <Button clickHandler={handleBack} color="default" size='xs'>
           &#8592; {t('global.back')}
          </Button>
         </div>
        )}
        {registrationState == 'learner' ? (
          <>
            <div className="c-card d9">
              <div className="form_grider d1 col-12 ">
                <RegisterLearnerForm
                  registerSuccess={registerSuccess}
                  showAllField={showAllField}
                  state={state}
                  district={district}
                  school = {school}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="c-card d9">
            <div className="form_grider d1 col-12">
              <RegisterVtForm
                registerSuccess={registerSuccess}
                showAllField={showAllField}
                state={state}
                district={district}
                school = {school}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterTabs;
