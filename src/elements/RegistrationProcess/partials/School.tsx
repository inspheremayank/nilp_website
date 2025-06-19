'use client';
import { useContext, useState, useMemo, useRef, useLayoutEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';

import { AppContext } from '@/context/AppContext';
import { serverRequest } from '@/services/getServerSideRender';
import { CONSTANTS } from '@/config/constant';
import { GET_DISTRICT } from '@/config/apiConfig';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Button';
import SelectField from '@/components/Form/SelectField';
import Loader from '@/components/Loader';
import {
  restrictDigits,
  restrictSomeSpecialCharacters,
} from '@/config/globalUtils';
import { decrypt } from '@/utlis/encryption';

export const SchoolSchema = Yup.object({
  state_id: Yup.string().required('state is required'),
  district_id: Yup.string().required('district is required'),
  school_name: Yup.string().required('school name is required').trim(),
  reCaptcha: Yup.string()
    .required('captcha is required')
    .max(6, 'captcha must be at most 6 characters')
    .min(6, 'captcha must be 6 characters'),
});

const School = (props: any) => {
  const initialValues = {
    state_id: '',
    district_id: '',
    school_name:
      props.value.schoolValue && props.value.schoolValue.school_name !== ''
        ? props.value.schoolValue.school_name
        : '',
    reCaptcha: '',
  };
  const t = useTranslations();
  const { stateDropdown } = useContext(AppContext);
  const [stateValue, setStateValue] = useState<any>([]);
  const [stateName, setStateName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const selectStateRef = useRef<any>('');
  const selectDistrictRef = useRef<any>('');
  const [isLoader, setIsLoader] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const userCaptchaInputRef: any = useRef(null);

  const districtDropdown = useMemo(() => {
    return Object.keys(stateValue).map((key: any) => ({
      value: stateValue[key].district_id,
      label: stateValue[key].district_name,
    }));
  }, [stateValue]);

  useLayoutEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SchoolSchema}
        onSubmit={(values, action) => {
          const myObj = {
            udise_code: null,
            school: {
              state_id: values.state_id,
              // state_name: stateName,
              // district_name: districtName,
              district_id: values.district_id,
              school_name: values.school_name,
            },
            pincode: null,
            size: 10,
            page: 1,
          };
          const user_captcha = userCaptchaInputRef.current?.value;
          if (validateCaptcha(user_captcha)) {
            loadCaptchaEnginge(6);
            userCaptchaInputRef.current.value = '';
            props.clickHandler(myObj);
          } else {
            setSubmitSuccess(true);
            setAlertMsg(`${t('global.captchaMatch')}`);
            userCaptchaInputRef.current.value = '';

            setTimeout(function () {
              setSubmitSuccess(false);
            }, 3000);
          }
        }}
        onReset={(values) => {
          if (selectStateRef.current) {
            selectStateRef.current.clearValue();
          }
          if (selectDistrictRef.current) {
            selectDistrictRef.current.clearValue();
          }
          values = initialValues;

          props.clearHandler();
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
          setFieldValue,
          validateField,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 col-lg-4">
                  <SelectField
                    label={`${t('global.state')}`}
                    placeholder={`${t('global.stateplaceholder')}`}
                    name="state_id"
                    reference={selectStateRef}
                    errors={errors.state_id}
                    touched={touched.state_id}
                    onKeyDown={restrictDigits}
                    options={stateDropdown}
                    value={stateDropdown.filter(
                      (item) => item.value == values.state_id
                    )}
                    defaultValue={
                      props.value.schoolValue &&
                      props.value.schoolValue.state_id !== ''
                        ? {
                            label: props.value.schoolValue.state_name,
                            value: props.value.schoolValue.state_id,
                          }
                        : ''
                    }
                    onChange={async (stateItem: any) => {
                      setFieldValue(
                        'state_id',
                        stateItem ? stateItem.value : ''
                      );
                      await validateField('state_id');
                      setStateName(stateItem.label);
                      if (stateItem && stateItem.value) {
                        setIsLoader(true);
                        selectDistrictRef.current.clearValue();
                        // API hit
                        const dropdownInfo = await serverRequest(
                          null,
                          `${GET_DISTRICT}?state_id=${stateItem.value}`,
                          CONSTANTS.REQUEST_GET
                        );

                        if (dropdownInfo.status == CONSTANTS.STATUS_SUCCESS) {
                          const decryptedData = JSON.parse(decrypt(dropdownInfo.data))
                          setIsLoader(false);
                          setStateValue(decryptedData);
                        }
                        if(dropdownInfo.status == CONSTANTS.STATUS_FAILED){
                          setIsLoader(false);
                          setStateValue([]);
                        }
                      }
                    }}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="col-12 col-lg-4">
                  <SelectField
                    label={`${t('global.district')}`}
                    placeholder={`${t('global.districtplaceholder')}`}
                    name="district_id"
                    reference={selectDistrictRef}
                    onKeyDown={restrictDigits}
                    value={values.district_id}
                    errors={errors.district_id}
                    defaultValue={
                      props.value.schoolValue &&
                      props.value.schoolValue.district_id !== ''
                        ? {
                            label: props.value.schoolValue.district_name,
                            value: props.value.schoolValue.district_id,
                          }
                        : ''
                    }
                    touched={touched.district_id}
                    options={districtDropdown}
                    onChange={(districtItem: any) => {
                      if (districtItem != null) {
                        setDistrictName(districtItem.label);
                      }
                      setFieldValue(
                        'district_id',
                        districtItem ? districtItem.value : ''
                      );
                      validateField('district_id');
                    }}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="col-12 col-lg-4">
                  <InputField
                    type="text"
                    label={`${t('global.schoolname')}`}
                    maxLength={100}
                    value={values.school_name}
                    name="school_name"
                    placeholder={`${t('global.schoolnameplaceholder')}`}
                    errors={errors.school_name}
                    touched={touched.school_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onKeyDown={restrictSomeSpecialCharacters}
                  />
                </div>
              </div>
              <div className="captcha_wrapper">
                <LoadCanvasTemplate reloadText={`${t('global.reloadCaptcha')}`}/>
                <InputField
                  placeholder="Enter Captcha"
                  reference={userCaptchaInputRef}
                  name="reCaptcha"
                  type="text"
                  maxLength={6}
                  value={values.reCaptcha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.reCaptcha}
                  touched={touched.reCaptcha}
                  cls="ms-0 ms-md-4"
                />
              </div>
              {submitSuccess && (
                <div className="d-flex justify-content-center text-center">
                  <span className="alert alert-danger"> {alertMsg} </span>
                </div>
              )}

              <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                  <div className="row justify-content-center">
                    <div className="col-12 col-lg-4 col-md-6">
                      <div className="form_grider_wrap">
                        <Button
                          type="submit"
                          color="gradient"
                          varient="solid"
                          radius="md"
                        >
                          {t('global.search')}
                        </Button>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 col-md-6">
                      <div className="form_grider_wrap">
                        <Button
                          type="reset"
                          color="gradient"
                          varient="bordered"
                          radius="md"
                          clickHandler={() => {
                            resetForm();
                            setStateValue([]);
                            setFieldValue('state_id', '');
                            setFieldValue('district_id', '');
                          }}
                        >
                          {t('global.clear')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isLoader ? <Loader /> : ''}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default School;
