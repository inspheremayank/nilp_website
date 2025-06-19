'use client';
import { useLayoutEffect, useRef, useState } from 'react';
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

const MobileValid = ({
  userValidity,
  otpScreenDisplay,
  eventHandle,
  hasEncrypt,
  parameter,
  showLoader,
  mobile,
}: any) => {
  const initialValues = {
    [parameter]: '',
    reCaptcha: '',
  };
  const TaggingVolunteerSchema = Yup.object({
    [parameter]: Yup.string()
      .required('mobile number is required')
      .min(10, '10 digit mobile number is required'),
    reCaptcha: Yup.string()
      .required('captcha is required')
      .max(6, 'captcha must be at most 6 characters')
      .min(6, 'captcha must be 6 characters'),
  });
  const t = useTranslations();
  const mobileNumberRef = useRef<any>('');
  const [alertMsg, setAlertMsg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const userCaptchaInputRef: any = useRef(null);

  useLayoutEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // used to allow only numbers
  const keyDownFunc = (event: any) => {
    restrictAlphabets(event, mobileNumberRef,true);
  };

  //function to generate OTP
  const generateOtp = async (values: any) => {
    mobile(values.mobile);
    //encrytion of mobile no if required
    var data = {
      [parameter]: values[parameter],
    };
    if (hasEncrypt) {
      data = {
        [parameter]: values[parameter],
      };
    }
    const encryptedInfo = {data :  encrypt(JSON.stringify(data))};
    try {
      const res = await serverRequest(
        encryptedInfo,
        eventHandle,
        CONSTANTS.REQUEST_POST,
        true
      );
      if (res.status == CONSTANTS.STATUS_FAILED) {
        toast.error(res.message);
        showLoader(false);
      } else {
        const decryptedData = JSON.parse(decrypt(res.data));
        userValidity(decryptedData);
        showLoader(false);
        otpScreenDisplay(true);
      }
    } catch (error) {
      toast.error('Failed to generate OTP. Please try again.');
      showLoader(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={TaggingVolunteerSchema}
        onSubmit={async (values, action) => {
          showLoader(true);
          const user_captcha = userCaptchaInputRef.current?.value;
          if (validateCaptcha(user_captcha)) {
            loadCaptchaEnginge(6);
            userCaptchaInputRef.current.value = '';

            generateOtp(values);
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
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <>
              <div className="c-card d9 my-4 row ">
                <div className="form_grider d1 col-12 col-lg-6 text-center">
                  <Form onSubmit={handleSubmit}>
                    <div className="form_grider_container">
                      <InputField
                        type="text"
                        label=""
                        value={values[parameter]}
                        name={parameter}
                        placeholder={`${t('global.registeredmobile')}`}
                        errors={errors[parameter]}
                        touched={touched[parameter]}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        onKeyDown={keyDownFunc}
                        reference={mobileNumberRef}
                        maxLength={10}
                      />
                    </div>
                    <div className="captcha_wrapper">
                      <LoadCanvasTemplate reloadText={`${t('global.reloadCaptcha')}`} />
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
                    <div className="form_grider_container--inline">
                      <Button
                        type="submit"
                        color="primary"
                        radius="sm"
                        size="w-100"
                      >
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
      <ToastContainer />
    </>
  );
};

export default MobileValid;
