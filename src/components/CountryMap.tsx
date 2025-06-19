'use client';
import { useContext, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_map from 'highcharts/modules/map';

import { AppContext } from '@/context/AppContext';
import Loader from '@/components/Loader';

if (typeof Highcharts === 'object') {
  HC_map(Highcharts);
}

const CountryMap = (props: any) => {
  const { language } = useContext(AppContext);
  const [isLoader, setIsLoader] = useState(true);
  const [chartOptions, setChartOptions] = useState({
    chart: {},
    mapNavigation: {},
    legend: {},
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    series: [] as any,
  });
  const [nationalMap, setNationalMap] = useState(null);
  const defaultStateColor: string = '#E8E9EA';
  const defaultStateColor2: string = '#D2D3D4';
  const defaultStateColor3: string = '#DCDDDF';

  useEffect(() => {
    console.log(language);
    const fetchMapData = async () => {
      const response = await fetch(
        `/nilp/locales/${language}/india-map.json`
      );
      if (response) {
      }
      if (!response.ok) {
        console.error('Failed to fetch map data:', response.statusText);
        return;
      }
      const mapData = await response.json();
      setIsLoader(false);
      setNationalMap(mapData);
    };

    fetchMapData();
  }, [language]);

  useEffect(() => {
    if (nationalMap) {
      setChartOptions({
        chart: {
          map: nationalMap,
          height: 600,
          animation: false,
        },
        mapNavigation: {
          enabled: false,
          enableMouseWheelZoom: false,
          enableDoubleClickZoom: false,
          buttonOptions: {
            alignTo: 'plotBox',
          },
        },
        legend: {
          enabled: false,
          verticalAlign: 'top',
          floating: true,
          layout: 'vertical',
          align: 'right',
          symbolRadius: 0,
          symbolHeight: 14,
          itemStyle: {
            pointerEvents: 'none',
          },
        },
        title: {
          text: '',
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            joinBy: 'hc-key',
            name: '',
            type: 'map',
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
            events: {
              click: selectState,
            },
            dataLabels: {
              enabled: true,
              useHTML: true,
              formatter: function () {
                return `<div class="map_circle"></div>`;
              },
            },
            allAreas: false,
            keys: ['hc-key', 'value', 'color'],
            data: [
              ['madhya pradesh', '', defaultStateColor],
              ['uttar pradesh', ' ', defaultStateColor3],
              ['karnataka', ' ', defaultStateColor2],
              ['nagaland', ' ', defaultStateColor],
              ['jharkhand', ' ', defaultStateColor2],
              ['delhi', ' ', defaultStateColor],
              ['bihar', ' ', defaultStateColor],
              ['lakshadweep', ' ', defaultStateColor2],
              ['andaman and nicobar islands', ' ', defaultStateColor],
              ['assam', ' ', defaultStateColor2],
              ['west bengal', ' ', defaultStateColor3],
              ['puducherry', ' ', defaultStateColor2],
              ['daman and diu', ' ', defaultStateColor],
              ['gujarat', ' ', defaultStateColor3],
              ['rajasthan', ' ', defaultStateColor2],
              ['daman and diu', ' ', defaultStateColor],
              ['chhattisgarh', ' ', defaultStateColor3],
              ['tamil nadu', ' ', defaultStateColor],
              ['chandigarh', ' ', defaultStateColor2],
              ['punjab', ' ', defaultStateColor3],
              ['haryana', ' ', defaultStateColor],
              ['andhra pradesh', ' ', defaultStateColor2],
              ['maharashtra', ' ', defaultStateColor3],
              ['himachal pradesh', ' ', defaultStateColor],
              ['meghalaya', ' ', defaultStateColor],
              ['kerala', ' ', defaultStateColor2],
              ['telangana', ' ', defaultStateColor],
              ['mizoram', ' ', defaultStateColor3],
              ['tripura', ' ', defaultStateColor],
              ['manipur', ' ', defaultStateColor3],
              ['arunachal pradesh', ' ', defaultStateColor2],
              ['odisha', ' ', defaultStateColor],
              ['jammu and kashmir', ' ', defaultStateColor2],
              ['sikkim', ' ', defaultStateColor],
              ['uttarakhand', ' ', defaultStateColor3],
              ['ladakh', ' ', defaultStateColor],
              ['lakshadweep', ' ', defaultStateColor],
            ],
          } as any,
        ],
      });
    }
  }, [nationalMap]);

  const selectState = (event: any) => {
    // const stateName = event.point.name;
    const id = event.point['hc-key'];

    props.setIsNationalMap(false);
    props.setIsSelectedState(id);
  };

  return (
    <>
      
      {isLoader ? <Loader cls="d5" /> : <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType={'mapChart'}
      />}
    </>
  );
};

export default CountryMap;
