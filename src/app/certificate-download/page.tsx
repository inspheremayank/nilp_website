

'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { toast, ToastContainer } from 'react-toastify';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';

import { CONSTANTS } from '@/config/constant';
import { restrictAlphabets } from '@/config/globalUtils';
import { serverRequest } from '@/services/getServerSideRender';

import InputField from '@/components/Form/InputField';
import Button from '@/components/Button';
import { decrypt, encrypt } from '@/utlis/encryption';
import SelectField from '@/components/Form/SelectField';
import { EXAM_LIST, GENERATE_OTP, VALIDATE_OTP, MARKS_LIST, DOWNLOAD_CERTIFICATE } from '@/config/apiConfig';
import OtpValidNios from '@/elements/MobileValidation/OtpValidNios';
import Loader from '@/components/Loader';

interface Learner {
  id: string;
  learner_marks_id: number;
  exam_id: number;
  exam_date: string;
  exam_title: string;
  first_name: string;
  last_name?: string | null;
  gender: string;
  registration_no?: string | null;
  father_name: string;
  mother_name: string;
  state_name: string;
  district_name: string;
  nios_status: number;
  full_count: string;
}

interface MarksListResponse {
  learnerList: Learner[];
  meta: {
    total_count: number;
    total_page?: number | null;
  };
}

const CertificateDownload = () => {
  const initialValues = {
    mobile: '',
    reCaptcha: '',
    exam: '',
  };

  const TaggingVolunteerSchema = Yup.object({
    mobile: Yup.string()
      .required('mobile number is required')
      .min(10, '10 digit mobile number is required'),
    reCaptcha: Yup.string()
      .required('captcha is required')
      .max(6, 'captcha must be at most 6 characters')
      .min(6, 'captcha must be 6 characters'),
    exam: Yup.string().required('select exam'),
  });

  const t = useTranslations();
  const mobileNumberRef = useRef<any>('');
  const userCaptchaInputRef: any = useRef(null);

  const [alertMsg, setAlertMsg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [examList, setExamList] = useState<{ value: string; label: string }[]>([]);
  const [otp, setOtp] = useState('');
  const [transction, setTransction] = useState('');
  const [otpScreen, setOtpScreen] = useState(false);
  const [userValidInfo, setUserValidInfo] = useState<any>(null);
  const [taggedLearnerScreen, setTaggedLearnerScreen] = useState(false);
  const [hasLoader, setHasLoader] = useState(false);
  const [decriptedMobileNo, setDecriptedMobileNo] = useState('');

  const [marksList, setMarksList] = useState<MarksListResponse | null>(null);

  useLayoutEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const keyDownFunc = (event: any) => {
    restrictAlphabets(event, mobileNumberRef, true);
  };


  const generateOtp = async (values: any) => {
    setHasLoader(true);
    try {
      const payload = { mobile: values.mobile };
      const encryptedPayload = { data: encrypt(JSON.stringify(payload)) };
      const response = await serverRequest(
        encryptedPayload,
        GENERATE_OTP,
        CONSTANTS.REQUEST_POST,
        true,
        true
      );

      if (response.status === CONSTANTS.SUCCESS) {
        const decrypted = JSON.parse(decrypt(response.data));
        toast.success('OTP has been sent successfully!');
        setOtp(decrypted.otp);
        setTransction(decrypted.transction);
        console.log('Selected Exam:', values.exam);
        setUserValidInfo({
          otp: decrypted.otp,
          tsnId: decrypted.tsnid,
          examId: values.exam,
          ...decrypted,
        });
        setDecriptedMobileNo(decrypted.mobile || values.mobile);
        setOtpScreen(true);
      } else {
        toast.error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
      toast.error('An error occurred while generating OTP');
    } finally {
      setHasLoader(false);
    }
  };

  const fetchExamList = async () => {
    try {
      const res = await serverRequest({}, EXAM_LIST, CONSTANTS.REQUEST_GET, true, true);
      if (res.status === CONSTANTS.SUCCESS) {
        const decryptData = JSON.parse(decrypt(res.data));
        const formattedExam = decryptData.map((exam: any) => ({
          value: exam.id,
          label: exam.exam_title,
        }));
        setExamList(formattedExam);
      } else {
        toast.error(res.message || 'Failed to load exam');
      }
    } catch (error) {
      console.error('Error fetching exam list:', error);
    }
  };

  useEffect(() => {
    fetchExamList();
  }, []);

  const fetchLearnerMarks = async (mobile: string, examId: string | number) => {
    setHasLoader(true);
    try {
      const payload = { mobile, examId: Number(examId) };
      const encryptedPayload = { data: encrypt(JSON.stringify(payload)) };
      const response = await serverRequest(
        encryptedPayload,
        MARKS_LIST,
        CONSTANTS.REQUEST_POST,
        true,
        true
      );
      if (response.status === CONSTANTS.SUCCESS) {
        toast.success(response.message || 'Successfully fetched Learners Marks');
        const marksData: MarksListResponse = JSON.parse(decrypt(response.data));
        setMarksList(marksData);
        setTaggedLearnerScreen(true);
      } else {
        toast.error(response.message || 'Error fetching learners marks');
      }
    } catch (error) {
      console.error('Error fetching learner marks:', error);
      toast.error('Something went wrong');
    } finally {
      setHasLoader(false);
    }
  };

  const handleDownloadCertificate = async (learnerId: number, examId: number) => {
    try {
      const payload = {
        marksId: String(learnerId),
        examId: String(examId),
      };
      const encryptedPayload = { data: encrypt(JSON.stringify(payload)) };

      const response = await serverRequest(
        encryptedPayload,
        DOWNLOAD_CERTIFICATE,
        CONSTANTS.REQUEST_POST,
        true,
        true,
        true
      );

      if (response.status === CONSTANTS.SUCCESS) {
        const blob = response.data;

        if (blob.type !== 'application/pdf') {
          toast.error("Received file is not a PDF");
          return;
        }

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Certificate_${learnerId}.pdf`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);

        toast.success("Certificate downloaded successfully!");
      } else {
        toast.error(response.message || "Failed to download certificate");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download certificate");
    }
  };


  return (
    <>
      <div className="c-innerBanner v2 empty_box"></div>
      {/* <main className="c-body_container"> */}
      <div className="container custom_container">
        <div className="row">
          <div className="col-12">
            <div className="c-card d8 cmt-20 cmb-20">
              <div className='tabbing_wrap d4'>


                {!otpScreen && !taggedLearnerScreen && (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={TaggingVolunteerSchema}
                    onSubmit={async (values, action) => {
                      const user_captcha = userCaptchaInputRef.current?.value;
                      if (validateCaptcha(user_captcha)) {
                        loadCaptchaEnginge(6);
                        userCaptchaInputRef.current.value = '';
                        generateOtp(values);
                      } else {
                        setSubmitSuccess(true);
                        setAlertMsg(`${t('global.captchaMatch')}`);
                        userCaptchaInputRef.current.value = '';
                        setTimeout(() => {
                          setSubmitSuccess(false);
                        }, 3000);
                      }
                    }}
                  >
                    {({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                      return (
                        <>
                          <ul>
                            <li>
                              <button className="tabbing_wrap_item active">Certificate Download</button>
                            </li>
                          </ul>
                          <div className="c-card d7 my-4 d9 ">
                            <div className="form_grider d1 col-12 col-lg-6 text-center">
                              <div className='gc d3 text-center'>
                                <p className='gc__content'>Do you want to register through a school ?</p>
                              </div>
                              <Form onSubmit={handleSubmit}>
                                <div className="form_grider_container text-start">
                                  <InputField
                                    type="text"
                                    label="Enter Mobile Number"
                                    value={values.mobile}
                                    name={'mobile'}
                                    placeholder={`${t('global.registeredmobile')}`}
                                    errors={errors.mobile}
                                    touched={touched.mobile}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    onKeyDown={keyDownFunc}
                                    reference={mobileNumberRef}
                                    maxLength={10}
                                  />
                                </div>
                                <div className="form_grider_container text-start">
                                  <SelectField
                                    value={values.exam}
                                    label={'Select Exam'}
                                    name="exam"
                                    onBlur={handleBlur}
                                    options={examList}
                                    errors={errors.exam}
                                    touched={touched.exam}
                                    placeholder={`select exam`}
                                    onChange={(selectedExam: any) => {
                                      setFieldValue('exam', selectedExam ? selectedExam.value : '');
                                    }}
                                  />
                                </div>
                                <div className="captcha_wrapper">
                                  <LoadCanvasTemplate />
                                  <div className='w-100'>
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
                                    />
                                  </div>

                                </div>
                                {submitSuccess && (
                                  <div className="d-flex justify-content-center text-center">
                                    <span className="alert alert-danger"> {alertMsg} </span>
                                  </div>
                                )}
                                <div className="form_grider_container--inline">
                                  <Button type="submit" color="primary" radius="sm" size="w-100">
                                    {t('global.sendOTP')}
                                  </Button>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </>
                      );
                    }}
                  </Formik>
                )}

                {otpScreen && userValidInfo?.examId && (
                  <>
                    <ul>
                      <li>
                        <button className="tabbing_wrap_item active">Certificate Download</button>
                      </li>
                    </ul>
                    <div className="c-card d7 my-4 d9">
                      <div className="form_grider d1 col-12 col-lg-6 text-center">
                        <div className='gc d3 text-center'>
                          <p className='gc__content'>OTP Validation</p>
                        </div>
                        <OtpValidNios
                          showLoader={setHasLoader}
                          eventHandler={VALIDATE_OTP}
                          mobile={decriptedMobileNo}
                          userValidity={setUserValidInfo}
                          userValid={userValidInfo}
                          taggedLearner={setTaggedLearnerScreen}
                          otpScreenDisplay={setOtpScreen}
                          onOtpValidated={() => {
                            if (decriptedMobileNo && userValidInfo?.examId) {
                              fetchLearnerMarks(decriptedMobileNo, userValidInfo.examId);
                            }
                          }}
                        />
                      </div>

                    </div>
                  </>
                )}

                {taggedLearnerScreen && marksList && (
                  <div className="c-card d8 cmt-20 cmb-20">
                    <div className="c-card d7">
                      <div className="gc d3 text-center">
                        <p className="gc__content">Learner List</p>
                      </div>
                      <div className="c-card d9 my-4 row">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Father Name</th>
                              <th>Mother Name</th>
                              <th>Exam Title</th>
                              <th>Exam Date</th>
                              <th>Gender</th>
                              <th>State</th>
                              <th>District</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {marksList.learnerList.length > 0 ? (
                              marksList.learnerList.map((learner) => (
                                <tr key={learner.id}>
                                  <td>{learner.first_name} {learner.last_name}</td>
                                  <td>{learner.father_name}</td>
                                  <td>{learner.mother_name}</td>
                                  <td>{learner.exam_title}</td>
                                  <td>{new Date(learner.exam_date).toLocaleDateString()}</td>
                                  <td>{learner.gender}</td>
                                  <td>{learner.state_name}</td>
                                  <td>{learner.district_name}</td>
                                  {/* <td>
                          <Button
                            type="button"
                            // color="success"
                            radius="sm"
                            size="w-100"
                            clickHandler={() => handleDownloadCertificate(learner.learner_marks_id, learner.exam_id)}
                          >
                            Download
                          </Button>
                        </td> */}

                                  <td>
                                    <button className='u-button primary solid size-sm radius-sm' onClick={() => handleDownloadCertificate(learner.learner_marks_id, learner.exam_id)}>Download</button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={6} className="text-center">
                                  No learner marks found.
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
                {hasLoader && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </main> */}
    </>
  );
};

export default CertificateDownload;
