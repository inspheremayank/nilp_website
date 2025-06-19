'use client';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import TaggedLearners from '@/elements/RegistrationProcess/partials/TaggedLearners';
import Loader from '@/components/Loader';

import {
  POST_VT_REGISTER_ENDPOINT,
  POST_TAGGING_LEARNERS,
  POST_REGISTER_ENDPOINT,
} from '@/config/apiConfig';

const VTTAGGINGLEARNERS = () => {
  const router = useRouter();
  const contentInfo = useContext(AppContext);
  const [hasLoader, setHasLoader] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  if (contentInfo.encryptDataValue == null) {
    router.push('/register-tagging?tab=registration');
  }
  return (
    <>
      <div className="c-innerBanner v2 empty_box"></div>
      <main className="c-body_container">
        {contentInfo.encryptDataValue != null && (
          <div className="container custom_container cmt-20 cmb-20">
            <div className="row">
              <div
                className={`${isConfirming ? '' : 'c-card d8 cpt-20 cmb-30'}`}
              >
                <TaggedLearners
                  payload={contentInfo.encryptDataValue}
                  isSource="direct"
                  showLoader={setHasLoader}
                  postTaggingResponse={POST_TAGGING_LEARNERS}
                  eventHandler={POST_VT_REGISTER_ENDPOINT}
                  confirmData={setIsConfirming}
                  registerAPI={POST_REGISTER_ENDPOINT}
                />
              </div>
            </div>
          </div>
        )}
      </main>
      {hasLoader && <Loader />}
    </>
  );
};

export default VTTAGGINGLEARNERS;
