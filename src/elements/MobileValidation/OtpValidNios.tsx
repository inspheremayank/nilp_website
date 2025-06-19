'use client';
import React from 'react'
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import OtpInput from 'react-otp-input';
import { useTranslations } from 'next-intl';
import { toast, ToastContainer } from 'react-toastify';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';

import { CONSTANTS } from '@/config/constant';
import { serverRequest } from '@/services/getServerSideRender';

import Button from '@/components/Button';
import InputField from '@/components/Form/InputField';
import { Form, Formik } from 'formik';
import { captchaSchema } from '@/schemas/formSchemas';


const OtpValidNios = ({
  userValid,
  userValidity,
  taggedLearner,
  otpScreenDisplay,
  showLoader,
  eventHandler,
  generateEventHandler,
  mobile,
  onOtpValidated
}: any) => {
    const t = useTranslations();
  const [otp, setOtp] = useState('');
  const [showOtpTimer, setShowOtpTimer] = useState(true);
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(60);
  const [alertMsg, setAlertMsg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const userCaptchaInputRef: any = useRef(null);

  const initialValues = {
    reCaptcha: '',
  };

  useEffect(() => {
    const totalSeconds = min * 60 + sec;
    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        setSec((prevSec) => {
          if (prevSec === 0) {
            setMin(min - 1);
            return 59;
          }
          return prevSec - 1;
        });
      } else {
        clearInterval(interval);
        setShowOtpTimer(false);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [min, sec, showOtpTimer]);

  useLayoutEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateOtp = async () => {
    console.log("userValid",userValid);
    if (otp.length == 6) {
      const data = {
        otp: otp,
        tsnId: userValid.tsnId,
      };
      console.log("data ",data);
      try {
        const req = await serverRequest(
          data,
          eventHandler,
          CONSTANTS.REQUEST_POST,
          true,
          true
        );
        if (req?.errors) {
          toast.error(req.errors[0].message);
          showLoader(false);
        } else {
          taggedLearner(true);
          otpScreenDisplay(false);
          showLoader(false);
          onOtpValidated()
        }
      } catch (error) {
        toast.error('Failed to generate OTP. Please try again.');
        showLoader(false);
      }
    }
  };
  return (
    <>
        <Formik
        initialValues={initialValues}
        validationSchema={captchaSchema}
        onSubmit={async (values, action) => {
          showLoader(true);
          const user_captcha = userCaptchaInputRef.current?.value;
          if (validateCaptcha(user_captcha)) {
            loadCaptchaEnginge(6);
            userCaptchaInputRef.current.value = '';
            handleValidateOtp();
          } else {
            showLoader(false);
            setSubmitSuccess(true);
            setAlertMsg(`${t('global.captchaMatch')}`);
            userCaptchaInputRef.current.value = '';

            setTimeout(function () {
              setSubmitSuccess(false);
            }, 3000);
          }
        }}
      >
        {({
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="row justify-content-center align-items-center  form_grider d1">
                <div className="d-flex justify-content-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'transparent',
                      outline: 'none',
                      borderRadius: '10px',
                      border: '1px solid var(--grey8)',
                      fontSize: 'var(--fontSize22)',
                    }}
                    inputType="tel"
                    shouldAutoFocus={true}
                  />
                </div>
                <div className="captcha_wrapper cmt-30 cp-70">
                  <LoadCanvasTemplate />
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
                {submitSuccess && (
                  <div className="d-flex justify-content-center text-center">
                    <span className="alert alert-danger"> {alertMsg} </span>
                  </div>
                )}
                <div className="col-9 col-xl-4 col-lg-6 col-md-8">
                  <>
                    <Button
                      type="submit"
                      color={
                        otp.length < 6 ||
                        values.reCaptcha == '' ||
                        values.reCaptcha.split('').length < 6
                          ? 'disabled'
                          : 'primary'
                      }
                      radius="sm"
                      size="w-100"
                    >
                      {t('global.validateOTP')}
                    </Button>
                    {/* {showOtpTimer ? (
                      <p className="cmt-20 text-center">
                        {t('global.resendOTP')} in : {min}:
                        {sec < 10 ? `0${sec}` : sec}
                      </p>
                    ) : (
                      <div
                        className="cmt-20 text-center"
                        onClick={handleResendOtp}
                      >
                        <span className="bottom-border-text">
                          {t('global.resendOTP')}
                        </span>
                      </div>
                    )} */}
                  </>
                </div>
              </div>
              <ToastContainer />
            </Form>
          );
        }}
      </Formik>
    </>
  )
}

export default OtpValidNios
