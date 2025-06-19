'use client';
import { useState, useEffect, useContext } from 'react';
import { useTranslations } from 'next-intl';
import SelectField from '@/components/Form/SelectField';
import { AppContext } from '@/context/AppContext';

const CustomSlmaDirector = () => {
  const t = useTranslations();
  const [data, setData] = useState<any>([]);
  const [defaultValue, setDefaultValue] = useState<any>({});
  const [selectState, setSelectState] = useState<any>(null);
  const { language } = useContext(AppContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/nilp/locales/${language === '' ? 'en' : language}/states.json`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response?.json();
      const sortedData = data?.sort((a: any, b: any) =>
        a.state.localeCompare(b.state)
      );
      setData(sortedData);
      if (sortedData.length > 0) {
        setSelectState(sortedData[0]);
      }
      if (sortedData != null && sortedData.length > 0) {
        setDefaultValue({
          value: sortedData[0].id,
          label: sortedData[0].state,
        });
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  const handleChange = (selectedOption: any) => {
    const selected = data.find(
      (item: any) => item.id === selectedOption.value.id
    );

    setSelectState(selected || null);
  };

  return (
    <>
      {data != null && data.length > 0 && (
        <div className="container custom_container">
          <div className="row">
            <div className="col-12">
              <div className="c-boxContainer">
                <div className="hw d6 cmb-20 cmt-20">
                  <h1 className="hw__title">{t('global.slma')}</h1>
                </div>

                <div className="contactus_directors form_grider d1">
                  <SelectField
                    placeholder={`${t('global.stateplaceholder')}`}
                    name="state"
                    value={
                      selectState
                        ? { value: selectState, label: selectState.state }
                        : null
                    }
                    options={data.map((item: any) => ({
                      value: item,
                      label: item.state,
                    }))}
                    onChange={handleChange}
                    onBlur={() => ''}
                    defaultValue={defaultValue}
                  />
                </div>
              </div>
              {language && (
                <div className="c-table d2 cmt-20">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>NAME OF STATE/UT</th>
                          <th>DIRECTOR SLMA/SPD-IN-CHARGE OF ULLAS</th>
                          <th>PHONE/MOBILE NO. AND EMAIL ID</th>
                          <th>ADDRESS OF SLMA/SPD OFFICE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectState ? (
                          <tr>
                            <td>{selectState.state}</td>
                            <td>{selectState.name}</td>
                            <td>
                              {selectState.phone} {selectState.email}
                            </td>
                            <td>{selectState.address}</td>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan={4} className="text-center">
                              No state selected
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomSlmaDirector;
