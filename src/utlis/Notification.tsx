'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Modal from '@/components/modals/Modal';

const Notification = () => {
  const t = useTranslations();
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   const savedState = sessionStorage.getItem('notification-shown');
  //   if(savedState == null) {
  //     setShow(true);
  //     sessionStorage.setItem('notification-shown', 'true');
  //   }
  // }, []);

  return (
    <>
      {show && (
        <Modal
          heading={`${t('global.notification')}`}
          action={() => {
            setShow(false);
          }}
          timer={{ status: true, time: '5000', url: '/' }}
        >
          <p>
           {t('global.notificationContent')}
          </p>
        </Modal>
      )}
    </>
  );
};
export default Notification;
