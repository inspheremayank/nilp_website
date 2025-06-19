'use client';
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useContext,
  useMemo,
} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslations } from 'next-intl';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';

import { Form, Formik, FormikErrors } from 'formik';
import { LearnerRegisterSchema } from '@/schemas/formSchemas';

import { AppContext } from '@/context/AppContext';
import { CONSTANTS } from '@/config/constant';
import { GET_DISTRICT, POST_REGISTER_ENDPOINT } from '@/config/apiConfig';
import {
  restrictAlphabetDropdown,
  restrictAlphabets,
  restrictDigits,
  restrictDropdown,
  restrictProfessionDropdown,
  restrictSomeSpecialCharacters,
  restrictSpecialCharacters,
} from '@/config/globalUtils';
import { serverRequest } from '@/services/getServerSideRender';

import { decrypt, encrypt } from '@/utlis/encryption';
import Loader from '@/components/Loader';
import InputField from '@/components/Form/InputField';
import SelectField from '@/components/Form/SelectField';
import RadioField from '@/components/Form/RadioField';
import Button from '@/components/Button';
import {
  gender,
  instruction,
  learningmode,
  professionOption,
  proof_type,
  social,
} from '@/config/config';

const RegisterLearnerForm = ({
  registerSuccess,
  showAllField,
  state,
  district,
  school,
}: any) => {
  const { ageOptions } = useContext(AppContext);

  const initialValues = {
    fullname: '',
    age: '',
    mother_name: '',
    father_name: '',
    address: '',
    learning_mode: '',
    mobile: '',
    proof_type: '',
    proof_detail: '',
    social_category_id: '',
    profession: '',
    course_taught_in_language: '',
    gender: '',
    is_divyang: false,
    reCaptcha: '',
    state: state != undefined ? state : '',
    district: district != undefined ? district : '',
    mark_as: CONSTANTS.MARK_AS_LEARNER,
    school: school ? school : '', // not sending through form
    relation: '2', // not sending through form
  };

  const selectStateRef = useRef<any>('');
  const selectDistrictRef = useRef<any>('');
  const selectInstructionRef = useRef<any>('');
  const selectAgeRef = useRef<any>('');
  const selectProfessionRef = useRef<any>('');
  const selectGenderRef = useRef<any>('');
  const selectProofTypeRef = useRef<any>('');
  const selectSocialCategoryRef = useRef<any>('');
  const selectLearningModeRef = useRef<any>('');
  const selectEducationRef = useRef<any>('');
  const selectVtTypeRef = useRef<any>('');
  const mobileNumberRef = useRef<any>('');
  const userCaptchaInputRef: any = useRef(null);

  const t = useTranslations();
  const { stateDropdown } = useContext(AppContext);
  const [stateValue, setStateValue] = useState<any>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const districtDropdown = useMemo(() => {
    return Object.keys(stateValue).map((key: any) => ({
      value: stateValue[key].district_id,
      label: stateValue[key].district_name,
    }));
  }, [stateValue]);

  useLayoutEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // used to allow only numbers
  const keyDownFunc = (event: any) => {
    restrictAlphabets(event, mobileNumberRef,true);
    restrictSpecialCharacters(event);
  };

  // used to allow only alphabets
  const restrictFunc = (event: any) => {
    restrictDigits(event);
    restrictSpecialCharacters(event);
  };

  const validate = (values: any): FormikErrors<any> => {
    const errors: FormikErrors<any> = {};
    // Trim values before validation
    const trimmedMotherName = values.mother_name?.trim();
    const trimmedFatherName = values.father_name?.trim();
    const trimmedProofType = values.proof_type?.trim();
    const trimmedProofDetail = values.proof_detail?.trim();
    if (!trimmedMotherName && !trimmedFatherName) {
      const errorMessage =
        "mother's name or father's/husband's name is required";
      errors.mother_name = errorMessage;
      errors.father_name = errorMessage;
    }
    const proofTypeLengthMap: { [key: number]: number } = {
      1: 10,
      2: 10,
      3: 12,
      4: 13,
      5: 8,
      6: 12,
      7: 6,
      8: 14,
      9: 6,
      11: 6,
    };
    if (values.proof_type && values.proof_detail) {
      const requiredLength = proofTypeLengthMap[trimmedProofType];

      const containsInvalidChars = /[,.]/.test(trimmedProofDetail);
      if (containsInvalidChars) {
        errors.proof_detail = 'Comma and full stop are not allowed';
      } else if (requiredLength && trimmedProofDetail.length < requiredLength) {
        errors.proof_detail = `at least ${requiredLength} digits are required`;
      }
    }

    return errors;
  };

  return (
    <>
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={LearnerRegisterSchema}
          validate={validate}
          onSubmit={async (values, action) => {
            setIsLoader(true);
            const user_captcha = userCaptchaInputRef.current?.value;
            if (validateCaptcha(user_captcha)) {
              loadCaptchaEnginge(6);
              userCaptchaInputRef.current.value = '';
              try {
                const payload = {
                  ...values,
                  fullname: values.fullname,
                  address: values.address,
                  proof_detail: values.proof_detail,
                  mobile: values.mobile,
                  school: values.school ? values.school : undefined,
                };
                const encryptInfo = {data :  encrypt(JSON.stringify(payload))};
                const response = await serverRequest(
                  encryptInfo,
                  POST_REGISTER_ENDPOINT,
                  CONSTANTS.REQUEST_POST,
                  true
                );

                if (response && response.status == CONSTANTS.STATUS_FAILED) {
                  setIsLoader(false);
                  toast.error(response.message);
                }

                if (response && response.status == CONSTANTS.STATUS_SUCCESS) {
                  setIsLoader(false);
                  registerSuccess(true);
                }
              } catch (errors: any) {
                setIsLoader(false);
              } finally {
                setIsLoader(false);
              }
            } else {
              setIsLoader(false);
              setSubmitSuccess(true);
              setAlertMsg(`${t('global.captchaMatch')}`);

              userCaptchaInputRef.current.value = '';
              setTimeout(function () {
                setSubmitSuccess(false);
              }, 3000);
            }
          }}
          onReset={(values) => {
            const refs = [
              selectStateRef,
              selectDistrictRef,
              selectInstructionRef,
              selectAgeRef,
              selectEducationRef,
              selectGenderRef,
              selectLearningModeRef,
              selectProfessionRef,
              selectProofTypeRef,
              selectSocialCategoryRef,
              selectVtTypeRef,
            ];

            refs.forEach((ref) => {
              if (ref.current) {
                ref.current.clearValue();
              }
            });

            values = initialValues;
          }}
        >
          {({
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
            setFieldValue,
            validateField,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="row form_grider d1">
                  <div className="col-12 col-xl-3 col-lg-4">
                    <InputField
                      label={`${t('global.fullname')}*`}
                      type="text"
                      placeholder={`${t('global.fullnameplaceholder')}`}
                      name="fullname"
                      maxLength={30}
                      value={values.fullname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.fullname}
                      touched={touched.fullname}
                      onKeyDown={restrictFunc}
                    />
                  </div>
                  <div className="col-12 col-xl-3 col-lg-4">
                    <InputField
                      label={`${t('global.address')}*`}
                      type="text"
                      maxLength={200}
                      placeholder={`${t('global.addressplaceholder')}`}
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.address}
                      touched={touched.address}
                      onKeyDown={restrictSomeSpecialCharacters}
                    />
                  </div>
                  <div className="col-12 col-xl-3 col-lg-4">
                    <InputField
                      label={`${t('global.mothername')}*`}
                      type="text"
                      placeholder={`${t('global.mothernameplaceholder')}`}
                      name="mother_name"
                      maxLength={30}
                      value={values.mother_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.mother_name}
                      touched={touched.mother_name}
                      onKeyDown={restrictFunc}
                    />
                  </div>
                  <div className="col-12 col-xl-3 col-lg-4">
                    <InputField
                      label={`${t('global.fatherhusbandname')}*`}
                      type="text"
                      placeholder={`${t('global.fatherhusbandnameplaceholder')}`}
                      name="father_name"
                      maxLength={30}
                      value={values.father_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.father_name}
                      touched={touched.father_name}
                      onKeyDown={restrictFunc}
                    />
                  </div>
                  <div className="col-12 col-xl-3 col-lg-4">
                    <SelectField
                      value={values.age}
                      label={`${t('global.age')}*`}
                      name="age"
                      onBlur={handleBlur}
                      reference={selectAgeRef}
                      options={ageOptions}
                      errors={errors.age}
                      onKeyDown={restrictAlphabetDropdown}
                      touched={touched.age}
                      placeholder={`${t('global.ageplaceholder')}`}
                      onChange={(selectAge: any) => {
                        setFieldValue('age', selectAge ? selectAge.value : '');
                      }}
                    />
                  </div>
                  <div className="col-12 col-xl-3 col-lg-4">
                    <SelectField
                      value={values.gender}
                      label={`${t('global.gender')}*`}
                      name="gender"
                      onBlur={handleBlur}
                      options={gender}
                      onKeyDown={restrictDropdown}
                      reference={selectGenderRef}
                      errors={errors.gender}
                      touched={touched.gender}
                      placeholder={`${t('global.genderplaceholder')}`}
                      onChange={(selectGender: any) => {
                        setFieldValue(
                          'gender',
                          selectGender ? selectGender.value : ''
                        );
                      }}
                    />
                  </div>

                  <div className="col-12 col-xl-3 col-lg-4">
                    <InputField
                      label={`${t('global.mobile')}*`}
                      type="text"
                      placeholder={`${t('global.mobileplaceholder')}`}
                      name="mobile"
                      maxLength={10}
                      minLength={10}
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.mobile}
                      touched={touched.mobile}
                      reference={mobileNumberRef}
                      onKeyDown={keyDownFunc}
                    />
                  </div>
                  <div className="col-12 col-xl-3 col-lg-4">
                    <SelectField
                      label={`${t('global.IDtype')}*`}
                      placeholder={`${t('global.IDtypeplaceholder')}`}
                      name="proof_type"
                      value={values.proof_type}
                      options={proof_type}
                      onKeyDown={restrictDropdown}
                      errors={errors.proof_type}
                      reference={selectProofTypeRef}
                      touched={touched.proof_type}
                      onChange={(selectProofType: any) => {
                        setFieldValue(
                          'proof_type',
                          selectProofType ? selectProofType.value : ''
                        );
                      }}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="col-12 col-xl-3 col-lg-4">
                    <InputField
                      label={`${t('global.IDnumber')}*`}
                      type="text"
                      maxLength={30}
                      placeholder={`${t('global.IDnumberplaceholder')}`}
                      name="proof_detail"
                      value={values.proof_detail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={errors.proof_detail}
                      touched={touched.proof_detail}
                      onKeyDown={restrictSpecialCharacters}
                    />
                  </div>
                  <div className="col-12 col-xl-3 col-lg-4">
                    <SelectField
                      label={`${t('global.socialcategory')}*`}
                      placeholder={`${t('global.socialcategoryplaceholder')}`}
                      name="social_category_id"
                      value={values.social_category_id}
                      errors={errors.social_category_id}
                      onKeyDown={restrictDropdown}
                      touched={touched.social_category_id}
                      reference={selectSocialCategoryRef}
                      options={social}
                      onChange={(selectCategory: any) => {
                        setFieldValue(
                          'social_category_id',
                          selectCategory ? selectCategory.value : ''
                        );
                      }}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="col-12 col-xl-3 col-lg-4">
                    <SelectField
                      label={`${t('global.profession')}*`}
                      placeholder={`${t('global.professionplaceholder')}`}
                      errors={errors.profession}
                      touched={touched.profession}
                      name="profession"
                      value={values.profession}
                      onKeyDown={restrictProfessionDropdown}
                      options={professionOption}
                      reference={selectProfessionRef}
                      onChange={(selectProfession: any) => {
                        setFieldValue(
                          'profession',
                          selectProfession ? selectProfession.value : ''
                        );
                      }}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="col-12 col-xl-3 col-lg-4">
                    <SelectField
                      label={`${t('global.mediuminstruction')}*`}
                      placeholder={`${t('global.mediuminstructionplaceholder')}`}
                      name="course_taught_in_language"
                      errors={errors.course_taught_in_language}
                      onKeyDown={restrictDropdown}
                      touched={touched.course_taught_in_language}
                      value={values.course_taught_in_language}
                      options={instruction}
                      reference={selectInstructionRef}
                      onChange={(selectInstruction: any) => {
                        setFieldValue(
                          'course_taught_in_language',
                          selectInstruction ? selectInstruction.value : ''
                        );
                      }}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="col-12 col-xl-3 col-lg-4">
                    <SelectField
                      value={values.learning_mode}
                      label={`${t('global.teachingmode')}*`}
                      name="learning_mode"
                      onBlur={handleBlur}
                      options={learningmode}
                      onKeyDown={restrictDropdown}
                      errors={errors.learning_mode}
                      touched={touched.learning_mode}
                      reference={selectLearningModeRef}
                      placeholder={`${t('global.teachingmodeplaceholder')}`}
                      onChange={(selectMode: any) => {
                        setFieldValue(
                          'learning_mode',
                          selectMode ? selectMode.value : ''
                        );
                      }}
                    />
                  </div>

                  {showAllField && (
                    <>
                      <div className="col-12 col-xl-3 col-lg-4">
                        <SelectField
                          label={`${t('global.state')}*`}
                          placeholder={`${t('global.stateplaceholder')}`}
                          name="state"
                          reference={selectStateRef}
                          errors={errors.state}
                          touched={touched.state}
                          onKeyDown={restrictDropdown}
                          options={stateDropdown}
                          value={values.state}
                          onChange={async (stateItem: any) => {
                            setFieldValue(
                              'state',
                              stateItem ? stateItem.value : ''
                            );
                            await validateField('state');

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
                      <div className="col-12 col-xl-3 col-lg-4">
                        <SelectField
                          label={`${t('global.district')}*`}
                          placeholder={`${t('global.districtplaceholder')}`}
                          name="district_id"
                          reference={selectDistrictRef}
                          value={values.district}
                          onKeyDown={restrictDropdown}
                          errors={errors.district}
                          touched={touched.district}
                          options={districtDropdown}
                          onChange={(districtItem: any) => {
                            setFieldValue(
                              'district',
                              districtItem ? districtItem.value : ''
                            );
                            validateField('district');
                          }}
                          onBlur={handleBlur}
                        />
                      </div>
                    </>
                  )}
                  <div className="col-12 col-xl-3 col-lg-4">
                    <RadioField label={`${t('global.divyangjan')}?`}>
                      <input
                        id="true"
                        type="radio"
                        name="is_divyang"
                        value="true"
                        checked={values.is_divyang === true}
                        // onChange={handleChange}
                        onChange={() =>
                          handleChange({
                            target: { name: 'is_divyang', value: true },
                          })
                        }
                      />
                      <label htmlFor="true" style={{ marginTop: '10px' }}>
                        {`${t('global.yes')}`}
                      </label>
                      <input
                        id="false"
                        type="radio"
                        name="is_divyang"
                        value="false"
                        checked={values.is_divyang === false}
                        onChange={() =>
                          handleChange({
                            target: { name: 'is_divyang', value: false },
                          })
                        }
                      />
                      <label htmlFor="false" style={{ marginTop: '10px' }}>
                        {`${t('global.no')}`}
                      </label>
                    </RadioField>
                  </div>

                  <div className="captcha_wrapper justify-content-start">
                  <LoadCanvasTemplate
                      reloadText={`${t('global.reloadCaptcha')}`}
                    />
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
                    <div className="d-flex text-center">
                      <span className="alert alert-danger"> {alertMsg} </span>
                    </div>
                  )}
                </div>

                <div className="row mt-5 justify-content-center">
                  <div className="col-12 col-lg-2 col-md-4 m-2">
                    <Button
                      color="gradient"
                      radius="md"
                      type="submit"
                      size="w-100"
                    >
                      {t('global.submit')}
                    </Button>
                  </div>
                  <div className="col-12 col-lg-2 col-md-4 m-2">
                    <Button
                      color="gradient"
                      varient="bordered"
                      radius="md"
                      clickHandler={resetForm}
                      size="w-100"
                    >
                      {t('global.clear')}
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>

        <ToastContainer />

        {isLoader && <Loader />}
      </div>
    </>
  );
};

export default RegisterLearnerForm;
