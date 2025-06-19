'use client';

import Button from '@/components/Button';
import CheckBoxField from '@/components/Form/CheckBoxField';
import Loader from '@/components/Loader';
import ConfirmationModal from '@/components/modals/ConfirmationModal';
import { CONSTANTS } from '@/config/constant';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { serverRequest } from '@/services/getServerSideRender';
import { decrypt, encrypt } from '@/utlis/encryption';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { mask } from '@/config/globalUtils';

const TaggedLearners = ({
  payload,
  showLoader,
  eventHandler,
  postTaggingResponse,
  taggedLearner,
  isSource,
  confirmData,
  registerAPI,
}: any) => {
  const t = useTranslations();
  const router = useRouter();
  const { setGlobalLoader } = useContext(AppContext);
  const [taggedLearnerList, setTaggedLearnerList] = useState([]);
  const [untaggedLearnerList, setUntaggedLearnerList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isThanksScreen, setIsThanksScreen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  console.log(payload);

  //const dataPayload = { ...payload };
  const [checkedLearners, setCheckedLearners] = useState<any>([]);

  const taggedLearnersRequest = async () => {
    showLoader(true);
    const encryptedData = {data :  encrypt(JSON.stringify(payload))};
    const fetchDirect = {
      mobile: payload?.mobile ? payload.mobile : null,
      state: payload.state,
      district: payload.district,
      school: payload.school,
      isSearch: false,
      mediumOfInstructions: payload.course_taught_in_language,
    };
    const encryptedFetchDirect = {data :  encrypt(JSON.stringify(fetchDirect))};
    try {
      const res = await serverRequest(
        isSource == 'direct' ? encryptedFetchDirect : encryptedData,
        eventHandler,
        CONSTANTS.REQUEST_POST,
        true
      );
      if (res && res.data && res.status == CONSTANTS.STATUS_SUCCESS) {
        const response = JSON.parse(decrypt(res.data))
        setTaggedLearnerList(response.tag_learner_list);
        setUntaggedLearnerList(response.untag_learner_list);
        setUserId(response.user_id);
        showLoader(false);
      }
      if (res?.status == CONSTANTS.STATUS_FAILED) {
        toast.error(res.message);
        showLoader(false);
        }
    } catch (error) {
      toast.error('Failed to get data');
      showLoader(false);
    }
  };

  useEffect(() => {
    // Call the async function
    if (payload != null) {
      showLoader(true);
      taggedLearnersRequest();
    }
  }, [payload?.mobile]);

  const handleSelectAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSelectAll = event.target.checked;
    setSelectAll(newSelectAll);
    const newCheckedItems: { [key: number]: boolean } = {};
    const newCheckedLearners: number[] = [];

    untaggedLearnerList.forEach((item: any) => {
      newCheckedItems[item.id] = newSelectAll;
      if (newSelectAll) {
        newCheckedLearners.push(item.id);
      }
    });
    setCheckedItems(newCheckedItems);
    setCheckedLearners(newCheckedLearners);
  };

  const handleIndividualChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newChecked = event.target.checked;
    const newCheckedItems = { ...checkedItems, [id]: newChecked };
    const newCheckedLearners = newChecked
      ? [...checkedLearners, id]
      : checkedLearners.filter((learnerId: number) => learnerId !== id);

    setCheckedItems(newCheckedItems);
    setCheckedLearners(newCheckedLearners);
    const allChecked = untaggedLearnerList.every(
      (item: any) => newCheckedLearners[item.id]
    );
    setSelectAll(allChecked);
  };

  const handleSubmit = async () => {
    if (checkedLearners.length > 0) {
      showLoader(true);
      const payload = {
        isTagging: true,
        learner: checkedLearners,
        vt: userId,
      };
      const encryptedInfo = { data: encrypt(JSON.stringify(payload)) };
      try {
        const response = await serverRequest(
          encryptedInfo,
          postTaggingResponse,
          CONSTANTS.REQUEST_POST,
          true
        );
        if (response.status === CONSTANTS.STATUS_SUCCESS) {
          showLoader(false);
          setIsVisible(true);
          setCheckedLearners([]);
        }
        if (response.status === CONSTANTS.STATUS_FAILED) {
          toast.error(response.message);
          setIsVisible(false);
          showLoader(false);
          setCheckedLearners([]);
        }
      } catch (error: any) {
        console.error(error);
        setIsVisible(false);
        showLoader(false);
      }
    }
  };

  const handleSubmitDirect = async () => {
    if (checkedLearners.length > 0) {
      showLoader(true);

      const registerPayload = {
        ...payload,
        mobile: payload.mobile,
        fullname: payload.fullname,
        address: payload.address,
        proof_detail: payload.proof_detail,
        school: payload.school ? payload.school : undefined,
      };
      const encryptedRegisterPayload = {
        data: encrypt(JSON.stringify(registerPayload)),
      };
      try {
        const res = await serverRequest(
          encryptedRegisterPayload,
          registerAPI,
          CONSTANTS.REQUEST_POST,
          true
        );
        if (res && res.status == CONSTANTS.STATUS_SUCCESS) {
          showLoader(false);
          const data = JSON.parse(decrypt(res.data))
          const payload = {
            isTagging: true,
            learner: checkedLearners,
            vt: data?.id,
          };
          const encryptedInfo = { data: encrypt(JSON.stringify(payload)) };
          const response = await serverRequest(
            encryptedInfo,
            postTaggingResponse,
            CONSTANTS.REQUEST_POST,
            true
          );
          if (response && response.status == CONSTANTS.STATUS_SUCCESS) {
            setIsThanksScreen(true);
            confirmData(true);
          }
          if (response && response.status == CONSTANTS.STATUS_FAILED) {
            toast.error(response.message);
            router.push('/register-tagging?tab=registration');
          }
        }
        if (res && res.status == CONSTANTS.STATUS_FAILED) {
          toast.error(res.data.update_error_message);

          setTimeout(function () {
            router.push('/register-tagging?tab=registration');
          }, 6000);
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        showLoader(false)
      }
    }
  };

  const handleConfirmation = () => {
    setIsVisible(false);
    taggedLearnersRequest();
  };

  console.log(payload);
  


  return (
    <>
      {isVisible && (
        <ConfirmationModal
          message={t('global.msg')}
          heading={t('global.submitted')}
          handleClick={handleConfirmation}
          customButton={t('global.confirm')}
          customButtonUrl=""
        />
      )}
      {isThanksScreen && isSource == 'direct' ? (
        <div className="text-center cmt-20 cmb-20">
          <div className="hw d2 cmb-20">
            <div className="hw__title">{t('global.thankyou')}</div>
          </div>

          <Link href="/">
            <Button color="primary" varient="solid">
              {t('global.home')}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="c-card d11">
          <div className="cmb-20">
            <div className="d-flex align-items-center justify-content-between">
              <div className="gc d3 semiBold">
                <div className="gc__content">{t('global.taggingRV')}</div>
              </div>

              {payload != null && isSource == 'direct' ? (
                <Link href="/register-tagging?tab=registration">
                  <Button color="default" size="xs">
                    &#8592; {t('global.back')}
                  </Button>
                </Link>
              ) : (
                <Link href="/register-tagging?tab=registration">
                  <Button
                    //clickHandler={() => taggedLearner(false)}
                    color="default"
                    size="xs"
                  >
                    &#8592; {t('global.back')}
                  </Button>
                </Link>
              )}
            </div>

            <div className="gc d1">
              <div className="gc__content cmb-10">
               <div className='inline-box'>
                {payload.isSearch == false && <div><span>Name :</span>{payload.fullname || username}</div>}
                <div><span>Mobile :</span>{mask(2,8,payload.mobile)}</div>
               </div>
              </div>
              {/* <div className="gc__content">
                <span>{payload.mobile}</span>
              </div> */}
            </div>
          </div>
          {isSource != 'direct' && (
            <>
              <div className="gc d3 semiBold cmb-10">
                <div className="gc__content">{t('global.taggedLearners')}</div>
              </div>
              <div className="c-table d1">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>{t('global.learnerID')}</th>
                        <th>{t('global.learnername')}</th>
                        <th>{t('global.state')}</th>
                        <th>{t('global.district')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taggedLearnerList.length > 0 ? (
                        taggedLearnerList.map((item: any) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                              {item.first_name == null
                                ? ''
                                : item.first_name +
                                  ' ' +
                                  (item.last_name == null
                                    ? ''
                                    : item.last_name)}
                            </td>
                            <td>{item.state_name}</td>
                            <td>{item.district_name}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
                            {t('global.nolearners')}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3">
            <div className="gc d3 semiBold">
              <div className="gc__content">{t('global.tagLearners')}</div>
            </div>
            {untaggedLearnerList.length > 0 && isSource == 'direct' ? (
              <Button
                type="submit"
                color={checkedLearners.length > 0 ? 'gradient' : 'disabled'}
                clickHandler={
                  checkedLearners.length > 0 ? handleSubmitDirect : () => ''
                }
              >
                {t('global.submittagging')}
              </Button>
            ) : (
              <Button
                type="submit"
                color={checkedLearners.length > 0 ? 'gradient' : 'disabled'}
                clickHandler={
                  checkedLearners.length > 0 ? handleSubmit : () => ''
                }
              >
                {t('global.submittagging')}
              </Button>
            )}
          </div>
          <div className="c-table d1">
            <div className="table-responsive">
              <table className="table form_grider d1">
                <thead>
                  <tr>
                    <th>
                      <CheckBoxField cls="mb-0" label="">
                        <input
                          id="selectAll"
                          type="checkbox"
                          name="selectAll"
                          value="selectAll"
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                          disabled={
                            untaggedLearnerList.length > 0 ? false : true
                          }
                        />
                        <label htmlFor="selectAll"></label>
                      </CheckBoxField>
                    </th>
                    <th>{t('global.learnerID')}</th>
                    <th>{t('global.learnername')}</th>
                    <th>{t('global.state')}</th>
                    <th>{t('global.district')}</th>
                  </tr>
                </thead>
                <tbody>
                  {untaggedLearnerList.length > 0 ? (
                    untaggedLearnerList.map((item: any) => (
                      <tr key={item.id}>
                        <td>
                          <CheckBoxField cls="mb-0" label="">
                            <input
                              id={`checkbox-${item.id}`}
                              type="checkbox"
                              name={item.id}
                              value={item.id}
                              checked={checkedItems[item.id] || false}
                              onChange={(e) =>
                                handleIndividualChange(e, item.id)
                              }
                            />
                            <label htmlFor={`checkbox-${item.id}`}></label>
                          </CheckBoxField>
                        </td>
                        <td>{item.id}</td>
                        <td>
                          {item.first_name == null
                            ? ''
                            : item.first_name +
                              ' ' +
                              (item.last_name == null ? '' : item.last_name)}
                        </td>
                        <td>{item.state_name}</td>
                        <td>{item.district_name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        {t('global.learneradded')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default TaggedLearners;
