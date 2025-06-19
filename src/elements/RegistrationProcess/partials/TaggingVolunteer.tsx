'use client';

import { useContext, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  POST_GENERATE_OTP,
  POST_VALIDATE_OTP,
  POST_VT_REGISTER_ENDPOINT,
  POST_TAGGING_LEARNERS,
} from '@/config/apiConfig';
import Loader from '@/components/Loader';
import MobileValid from '../../MobileValidation/MobileValid';
import OtpValid from '../../MobileValidation/OtpValid';
import TaggedLearners from './TaggedLearners';
import { AppContext } from '@/context/AppContext';
import Modal from '@/components/modals/Modal';

const TaggingVolunteer = () => {
  const t = useTranslations();
  const { globalLoader, setGlobalLoader } = useContext(AppContext);
  const [userValidInfo, setUserValidInfo] = useState(null);
  const [otpScreen, setOtpScreen] = useState(false);
  const [taggedLearnerScreen, setTaggedLearnerScreen] = useState(false);
  const [hasLoader, setHasLoader] = useState(false);
  const [decriptedMobileNo, setDecriptedMobileNo] = useState('');

  const data = {
    mobile: decriptedMobileNo,
    isSearch: true,
  };

  useEffect(() => {
    if (globalLoader) {
      const timer = setTimeout(() => {
        setGlobalLoader('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [globalLoader]);
  return (
    <>
      {taggedLearnerScreen ? (
        <TaggedLearners
          payload={data}
          showLoader={setHasLoader}
          postTaggingResponse={POST_TAGGING_LEARNERS}
          eventHandler={POST_VT_REGISTER_ENDPOINT}
          taggedLearner={setTaggedLearnerScreen}
        />
      ) : (
        <>
          <div className="c-card d7">
            <div className="gc d3  text-center">
              <p className="gc__content">{t('global.taggingRV')}</p>
            </div>
            {globalLoader && (
              <Modal
                cls="d6"
                action={() => setGlobalLoader('')}
                heading={'ERROR'}
              >
                {/* <div className="hw d4">
                  <div className="hw__title">{globalLoader}</div>
                </div> */}
                <p>{globalLoader}</p>
              </Modal>
            )}
            {!otpScreen ? (
              <MobileValid
                eventHandle={POST_GENERATE_OTP}
                otpScreenDisplay={setOtpScreen}
                userValidity={setUserValidInfo}
                hasEncrypt={true}
                mobile={setDecriptedMobileNo}
                showLoader={setHasLoader}
                parameter="mobile"
              />
            ) : (
              <OtpValid
                showLoader={setHasLoader}
                generateEventHandler={POST_GENERATE_OTP}
                eventHandler={POST_VALIDATE_OTP}
                mobile={decriptedMobileNo}
                userValidity={setUserValidInfo}
                userValid={userValidInfo}
                taggedLearner={setTaggedLearnerScreen}
                otpScreenDisplay={setOtpScreen}
              />
            )}
          </div>
        </>
      )}
      {hasLoader && <Loader />}
    </>
  );
};

export default TaggingVolunteer;
