'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import { AppContext } from '@/context/AppContext';
import { MAP_STATS } from '@/config/apiConfig';
import { serverRequest } from '@/services/getServerSideRender';
import { CONSTANTS } from '@/config/constant';
import Loader from '@/components/Loader';
import { decrypt } from './encryption';

const CountryMap = dynamic(() => import('@/components/CountryMap'));
const StateMap = dynamic(() => import('@/components/StateMap'));

const HighChartMap = () => {
  const [isNationalMap, setIsNationalMap] = useState(true);
  const [isSelectedState, setIsSelectedState] = useState('india');
  const [response, setResponse] = useState<any>(null);
  const [isLoader, setIsLoader] = useState(false);
  // const [learningData, setLearningData] = useState<any>(null);
  const t = useTranslations();
  const { language } = useContext(AppContext);

  useEffect(() => {
    const mapData = sessionStorage.getItem('map-data');
    const fetchMapData = async () => {
      // const response = await fetch(
      //   `/nilp/locales/${language}/glance-data.json`
      // );
      // const mapData = await response.json();
      // setLearningData(mapData);
      setIsLoader(true);
      if (mapData == null) {
        const response = await serverRequest(
          null,
          MAP_STATS,
          CONSTANTS.REQUEST_GET
        );
        // if (response?.data && Object.keys(response.data).length) {
        //   sessionStorage.setItem('map-data', JSON.stringify(response.data));
        //   setResponse(JSON.parse(decrypt(response)));
        //   setIsLoader(false);
        // }

        if(response && response.status == CONSTANTS.STATUS_SUCCESS){
          setResponse(JSON.parse(decrypt(response.data)));
          setIsLoader(false);
        }
      } 
      // else {
      //   setResponse(JSON.parse(mapData));
      //   setIsLoader(false);
      // }
    };
    fetchMapData();
  }, []);

  const backBtn = () => {
    setIsNationalMap(true);
    setIsSelectedState('india');
  };

  const renderStats = useCallback(() => {
    // let selectedData:any;
    // if(learningData != null){
    //   selectedData= learningData.find(
    //     (item: any) => item.name === isSelectedState
    //   );
    let selectedData;
    if (isSelectedState === 'india' && response != null) {
      const decryptData = response; //JSON.parse(decrypt(response))
      selectedData = {
        total_learners: decryptData.total_learners.toLocaleString(),
        total_volunteers: decryptData.total_volunteers.toLocaleString(),
        tagged_vt: decryptData.tagged_learner.toLocaleString(),
        tagged_learner: decryptData.tagged_vt.toLocaleString(),
        total_pass: decryptData.total_pass.toLocaleString(),
      };
    } else {
      if (response != null && isSelectedState != undefined) {
        const decryptData = response; //JSON.parse(decrypt(response))
        const data = decryptData.masterStateData;
        selectedData = data.find((item: any) => {
          const lowercaseItem = item.state_name.toLowerCase();
          return lowercaseItem === isSelectedState;
        });
      }
    }

    if (!selectedData) {
      return null;
    }

    const stats = [
      {
        label: `${t('global.noOfLearners')}`,
        value: selectedData.total_learners.toLocaleString(),
      },
      {
        label: `${t('global.noOfVolunteers')}`,
        value: selectedData.total_volunteers.toLocaleString(),
      },
      {
        label: `${t('global.taggedLearners')}`,
        value: selectedData.tagged_learner.toLocaleString(),
      },
      {
        label: `${t('global.taggedVolunteers')}`,
        value: selectedData.tagged_vt.toLocaleString(),
      },
      {
        label: `${t('global.FLNATExamAttended')}`,
        value: 'NA',
      },
      {
        label: `${t('global.passed')}`,
        value: selectedData.total_pass.toLocaleString(),
      },
    ];

    return stats.map((item, index) => (
      <div key={index} className={`c-stats_wrapper_item item_${index + 1}`}>
        <div className="c-stats_wrapper_item_content">
          <p className="count">{item.value}</p>
          <p className="label">{item.label}</p>
        </div>
        <div className="c-stats_wrapper_item_icon">
          <svg
            width="212"
            height="183"
            viewBox="0 0 212 183"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 91.5L53 0.134323L159 0.134323L212 91.5L159 182.866L53 182.866L0 91.5Z"
              fill="#025602"
            />
          </svg>
        </div>
      </div>
    ));
  }, [isSelectedState, response]); // learningData

  return (
    <>
      <div className="container custom_container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="c-stats_wrapper">
              <div className="c-stats_wrapper_container">{renderStats()}</div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="text-end cmb-20">
              {t('global.lastupdated')} :
              {response?.lastSyncTimestamp != undefined  ? 
                new Date(response?.lastSyncTimestamp).toLocaleDateString(
                  'en-GB',
                  { timeZone: 'UTC' }
                )
                : new Date().toLocaleDateString('en-GB', {
                  timeZone: 'UTC',
                })
              }
            </div>
            <div className="map_area">
              {isNationalMap ? (
                <CountryMap
                  setIsSelectedState={setIsSelectedState}
                  setIsNationalMap={setIsNationalMap}
                />
              ) : (
                <StateMap
                  isSelectedState={isSelectedState}
                  handleBack={backBtn}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HighChartMap;
