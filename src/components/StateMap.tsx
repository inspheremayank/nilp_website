'use client';
import { useEffect, useState, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslations } from 'next-intl';

import { AppContext } from '@/context/AppContext';
import Button from './Button';
import Loader from '@/components/Loader';

const StateMap = (props: any) => {
  const t = useTranslations();
  const { language } = useContext(AppContext);
  const [isLoader, setIsLoader] = useState(true);

  const [chartOptions, setChartOptions] = useState({
    chart: {},
    legend: {},
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    series: [] as any,
  });
  const [stateMap, setStateMap] = useState<any>(null);
  const defaultStateColor: string = '#F38332';

  useEffect(() => {
    console.log(language,props.isSelectedState);
    
    const fetchStateMap = async () => {
      const filepath = `/nilp/locales/${language}/states/${props.isSelectedState.replace(/ /g, '-')}.json`;
      const response = await fetch(filepath);
      const mapData = await response.json();
      setStateMap(mapData);
    };
    setIsLoader(false);

    fetchStateMap();
  }, [props.isSelectedState, language]);

  useEffect(() => {
    if (stateMap) {
      const modifiedData = { ...stateMap };
      modifiedData.data[0]['name'] = '';

      setChartOptions({
        title: {
          text: '',
        },
        chart: {
          type: 'map',
          animation: false,
        },
        legend: {
          enabled: false,
          verticalAlign: 'top',
          floating: false,
          layout: 'horizontal',
          align: 'right',
          symbolRadius: 0,
          symbolHeight: 14,
          symbolPadding: 5,
          itemStyle: {
            pointerEvents: 'none',
          },
        },

        credits: {
          enabled: false,
        },
        series: [
          {
            type: 'map',
            data: modifiedData.data[0].data,
            joinBy: 'id',
            name: '',
            mapData: modifiedData.data[0].mapData,
            allowPointSelect: false,
            cursor: 'pointer',
            borderColor: '#ffffff',
            states: {
              hover: {
                color: '#057fc7',
                borderColor: '#ffffff',
              },
              select: {
                color: '#057fc7',
                borderColor: '#057fc7',
              },
            },
          },
        ],
      });
    }
  }, [stateMap]);

  return (
    <>
      <div className="text-end cmb-20">
        <Button
          clickHandler={() => props.handleBack()}
          color="default"
          size="xs"
        >
          &#8592; {t('global.backToHome')}
        </Button>
      </div>
      {isLoader ? (
        <Loader cls="d5" />
      ) : (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          constructorType={'mapChart'}
        />
      )}
    </>
  );
};

export default StateMap;
