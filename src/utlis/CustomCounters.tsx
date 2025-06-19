'use client';
import { TOTAL_LEARNERS } from '@/config/apiConfig';
import { CONSTANTS } from '@/config/constant';
import { serverRequest } from '@/services/getServerSideRender';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Waypoint } from 'react-waypoint';
import { decrypt } from './encryption';

const CustomCounters = () => {
  const t = useTranslations();
  const [viewPortEntered, setViewPortEntered] = useState<boolean>(false);
  const [learnersCount, setLearnersCount] = useState<any>([]);
  const onVWEnter = () => {
    setViewPortEntered(true);
  };

  useEffect(() => {
    const getLearnersCount = async () => {
      try{
      const count = await serverRequest(
        null,
        TOTAL_LEARNERS,
        CONSTANTS.REQUEST_GET
      );
      if (count && count.status == CONSTANTS.STATUS_FAILED) {
        setLearnersCount([]);
      }
      if (count && count.status == CONSTANTS.STATUS_SUCCESS) {
        const decryptedData = JSON.parse(decrypt(count.data));
        setLearnersCount(decryptedData);
      }} catch(error){
        console.log(error)
      }
    };

    getLearnersCount();
  }, []);

  const data = [
    {
      id: '1',
      label:`${t('global.totalRT')}`,
      count: learnersCount.total_learner_count,
    },
    {
      id: '2',
      label: `${t('global.totalRV')}`,
      count: learnersCount.total_vt_count,
    },
    {
      id: '3',
      label: `${t('global.totalCertified')}`,
      count: learnersCount.total_neo_literate_certified_count,
    },
  ];

  return (
    <>
      <Waypoint onEnter={onVWEnter}>
        <div className="row">
          {viewPortEntered &&
            data.length > 0 &&
            data.map((item: any) => (
                <div className="c-counters__item col-12" key={item.id}>
                  <div className="c-counters__item_count">
                    <CountUp
                      end={item.count}
                      separator=","
                      start={0}
                      delay={1}
                      duration={5}
                    />
                  </div>
                  <div className="c-counters__item_text">{item.label}</div>
                </div>
            ))}
        </div>
      </Waypoint>
    </>
  );
};

export default CustomCounters;
