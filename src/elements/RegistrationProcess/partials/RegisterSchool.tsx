'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CONSTANTS } from '@/config/constant';
import { decrypt, encrypt } from '@/utlis/encryption';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import { GET_REGION_ENDPOINT } from '@/config/apiConfig';
import { serverRequest } from '@/services/getServerSideRender';
import UDSICode from './UDSICode';
import School from './School';
import Pincode from './Pincode';
import RegisterTabs from './RegisterTabs';
import Loader from '@/components/Loader';
import Pagination from '../../Pagination';
import Button from '@/components/Button';
import { toast, ToastContainer } from 'react-toastify';

const RegisterSchool = ({ registerSuccess }: any) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get('page');
  const page = Number(search) || 1;

  const [registrationState, setRegistrationState] = useState('udisecode');
  const [pageState, setPageState] = useState(false);
  const [pageData, setPageData] = useState<any>(null);
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [pageSpecificData, setPageSpecificData] = useState<any>(null);
  const [hasLoader, setHasLoader] = useState(false);
  const [pincode, setPincode] = useState('');
  const [udise, setUdise] = useState('');
  const [searchReq, setSearchReq] = useState<any>(null);
  const [schoolValue, setSchoolValue] = useState(null);
  const tableRef = useRef<any>('');
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (pageData == null) {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete('page');
      router.replace(`${pathname}?${nextSearchParams.toString()}`);
    }
  }, []);
  
  const handleSearchClick = async (data: any) => {
    setHasLoader(true);
    const reqData = { ...data, page: page };

    if(reqData.school != '') {
      reqData.school.state_id = `${reqData.school.state_id}`;
      reqData.school.district_id = `${reqData.school.district_id}`;
    }

    setSearchReq(reqData);
    const encryptInfo = {data : encrypt(JSON.stringify(reqData))};
    const res = await serverRequest(
      encryptInfo,
      GET_REGION_ENDPOINT,
      CONSTANTS.REQUEST_POST,
      true
    );

    if (res && res.status == CONSTANTS.STATUS_SUCCESS) {
      const decrypted = JSON.parse(decrypt(res.data));
      setPageData(decrypted.schoolList);
      setPageInfo(decrypted.meta);
      setHasLoader(false);
      setPincode(data.pincode);
      setUdise(data.udise_code);
      setSchoolValue(data.school);
      setShouldScroll(true);
    } 
    if(res && res.status == CONSTANTS.STATUS_FAILED) {
      setHasLoader(false);
      setPageInfo(undefined)
      setPageData(undefined)
      toast.error(res.message);
    }
  };

  useEffect(() => {
    if (pageData == null) {
      const nextSearchParams = new URLSearchParams(searchParams.toString());
      nextSearchParams.delete('page');
      router.replace(`${pathname}?${nextSearchParams.toString()}`);
    }
  }, [registrationState]);

  useEffect(() => {
    if (searchReq != null && pageData != null) {
      setHasLoader(true);
      
      const getDataByPage = async () => {
        const reqData = { ...searchReq, page: page };
        const encryptInfo = {data : encrypt(JSON.stringify(reqData))};
        const res = await serverRequest(
          encryptInfo,
          GET_REGION_ENDPOINT,
          CONSTANTS.REQUEST_POST,
          true
        );
        if (res && res.status == CONSTANTS.STATUS_SUCCESS) {
          const decrypted = JSON.parse(decrypt(res.data));
          setPageData(decrypted.schoolList);
          setHasLoader(false);
        }
        if(res && res.status == CONSTANTS.STATUS_FAILED){
          setHasLoader(false);
        }
      };

      getDataByPage();
    }
  }, [page]);

  useEffect(() => {
    if (shouldScroll) {
      if (tableRef) {
        const tableScroll = tableRef.current.getBoundingClientRect();
        window.scrollTo({
          top: tableScroll.top,
          left: tableScroll.left,
          behavior: 'smooth',
        });
      }
      setShouldScroll(false);
    }
  }, [shouldScroll, pageData]);

  const handleClearBtn = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete('page');
    router.replace(`${pathname}?${nextSearchParams}`);
    setPageData(null);
    setPincode('');
    setUdise('');
    setSchoolValue(null);
  };

  const handleDataTransfer = (item: any) => {
    setPageSpecificData(item);
  };
  const handleBackClick = () => {
    setRegistrationState(registrationState);
    setPageState(false);
    const newPage = decrypt(pageData)
    setPageData(newPage);
  };

  return (
    <>
      {pageState == false ? (
        <div className="c-card d7">
          <div className="gc d3 text-center">
            <p className="gc__content">{t('global.searchBy')}</p>
          </div>
          <Link href="/register-tagging?tab=registration" className="back-link">
            <Button color="default" size="xs">
              &#8592; {t('global.back')}
            </Button>
          </Link>

          <div className="c-card d9 d9--breakup my-4">
            <button
              onClick={() => {
                setRegistrationState('udisecode');
                setPageData(null);
                setUdise('');
              }}
              className={`c-card__item ${registrationState == 'udisecode' ? 'active' : ''}`}
            >
              <span className="circle"></span>
              <span>{t('global.udise')}</span>
            </button>
            <button
              onClick={() => {
                setRegistrationState('school');
                setPageData(null);
                setSchoolValue(null);
              }}
              className={`c-card__item ${registrationState == 'school' ? 'active' : ''}`}
            >
              <span className="circle"></span>
              <span>{t('global.school')}</span>
            </button>
            <button
              onClick={() => {
                setRegistrationState('pincode');
                setPageData(null);
                setPincode('');
              }}
              className={`c-card__item ${registrationState == 'pincode' ? 'active' : ''}`}
            >
              <span className="circle"></span>
              <span>{t('global.pincode')}</span>
            </button>
          </div>

          <div className="c-card d7">
            {registrationState == 'udisecode' ? (
              <>
                <div className="c-card d9 my-4">
                  <div className="form_grider d1 col-12 col-lg-6">
                    <UDSICode
                      clickHandler={handleSearchClick}
                      clearHandler={handleClearBtn}
                      value={udise}
                    />
                  </div>
                </div>
              </>
            ) : registrationState == 'school' ? (
              <div className="c-card d9 my-4">
                <div className="form_grider d1 col-12">
                  <School
                    clickHandler={handleSearchClick}
                    clearHandler={handleClearBtn}
                    value={{ schoolValue }}
                  />
                </div>
              </div>
            ) : (
              <div className="c-card d9 my-4">
                <div className="form_grider d1 col-12 col-lg-6">
                  <Pincode
                    clickHandler={handleSearchClick}
                    clearHandler={handleClearBtn}
                    value={pincode}
                  />
                </div>
              </div>
            )}
          </div>
          <div ref={tableRef}>
            {pageData != null ? (
              pageData.length > 0 ? (
                <>
                  <div className="c-table d1 table-responsive">
                    <div className="table-responsive">
                      <table className="table ">
                        <thead>
                          <tr>
                            <th>Choose School</th>
                            <th>UDISE Code</th>
                            <th>State/ UT</th>
                            <th>District</th>
                            <th>School Name</th>
                            <th>Pincode</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pageData?.map((item: any) => (
                            <tr
                              key={item.id}
                              onClick={() => {
                                setPageState(true);
                                handleDataTransfer(item);
                                const tableItem =
                                  document.getElementById('table-item');
                                tableItem?.classList.add('active');
                              }}
                            >
                              <td
                                className="c-card d9 no-border-hover"
                                id="table-item"
                              >
                                <button
                                  className={`c-card__item ${pageState ? 'active' : ''}`}
                                >
                                  <span className="circle"></span>
                                </button>
                              </td>
                              <td>{item.udise_code}</td>
                              <td>{item.state_name}</td>
                              <td>{item.district_name}</td>
                              <td>{item.school_name}</td>
                              <td>{item.pincode}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagination
                    currentPage={page}
                    searchParams={searchParams}
                    router={router}
                    pageInfo={pageInfo}
                  />
                </>
              ) : (
                <div className="c-card d7 cmt-50 cmb-50 text-center">
                  <Image
                    src={'images/error.svg'}
                    alt="not found"
                    className="img-fluid"
                    width={600}
                    height={450}
                  />
                  <div className="hw d7">
                    <div className="hw__error"> {t('global.notFound')}!</div>
                  </div>
                </div>
              )
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="c-card d7">
            <div className="d-flex align-items-center justify-content-between">
              <div className="gc d1">
                <div className="gc__content gc__bold text-uppercase">
                  {pageSpecificData.school_name}
                </div>
              </div>
              <Button clickHandler={handleBackClick} color="default" size="xs">
                &#8592; {t('global.back')}
              </Button>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-md-3">
                <span>State: {pageSpecificData.state_name}</span>
              </div>
              <div className="col-12 col-md-3">
                <span> District: {pageSpecificData.district_name}</span>
              </div>
              <div className="col-12 col-md-3">
                <span>Block: {pageSpecificData.block_name}</span>
              </div>
              {/* <div className="col-12 col-md-3">
                <span>
                  GP/Ward: {pageSpecificData.village_ward_name} -
                  {pageSpecificData.village_ward_code}
                </span>
              </div> */}
              <div className="col-12 col-md-3">
                <span>Pincode: {pageSpecificData.pincode}</span>
              </div>
            </div>
          </div>
          <div className="c-card d8 d8--breakup cmt-50">
            <div className="tabbing_wrap d4">
              <RegisterTabs
                showAllField={false}
                state={pageSpecificData.state_id}
                district={pageSpecificData.district_id}
                school={pageSpecificData.school_code}
                registerSuccess={registerSuccess}
              />
            </div>
          </div>
        </>
      )}
      <ToastContainer />
      {hasLoader && <Loader />}
    </>
  );
};

export default RegisterSchool;
