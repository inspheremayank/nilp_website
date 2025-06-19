'use client';

import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';

import InputField from '@/components/Form/InputField';
import Button from '@/components/Button';
import { restrictAlphabets } from '@/config/globalUtils';
import { AppContext } from '@/context/AppContext';

const UDSICode = (props: any) => {
  const t = useTranslations();
  const udsiCodeRef = useRef<any>('');
  const [alertMsg, setAlertMsg] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const userCaptchaInputRef: any = useRef(null);
  const { language } = useContext(AppContext);

  const initialValues = {
    udise_number:
      props.value !== undefined && props.value !== null ? props.value : '',
    reCaptcha: '',
  };


  const UDSIESchema = Yup.object({
    udise_number: Yup.string()
      .required('udise is required')
      .min(11, '11 digit udise code is required')
      .trim(),
    reCaptcha: Yup.string()
      .required('captcha is required')
      .max(6, 'captcha must be at most 6 characters')
      .min(6, 'captcha must be 6 characters'),
  });

  useLayoutEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  // used to allow only numbers
  const keyDownFunc = (event: any) => {
    restrictAlphabets(event, udsiCodeRef);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={UDSIESchema}
        onSubmit={(values, action) => {
          const myObj = {
            udise_code: values.udise_number,
            school: '',
            pincode: '',
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
        onReset={() => {
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
          validateForm,
        }) => {
          const handleInputChange = (event: any) => {
            const { name, value } = event.target;
            setFieldValue(name, value.trim());
          };

          return (
            <Form onSubmit={handleSubmit}>
              <div className="col-12 text-start">
                <InputField
                  type="text"
                  label={`${t('global.udise')}`}
                  value={values.udise_number}
                  name="udise_number"
                  placeholder={`${t('global.udiseplaceholder')}`}
                  errors={errors.udise_number}
                  touched={touched.udise_number}
                  onBlur={handleBlur}
                  onChange={handleInputChange}
                  maxLength={11}
                  onKeyDown={keyDownFunc}
                />
              </div>
              <div className="captcha_wrapper">
                <LoadCanvasTemplate reloadText={`${t('global.reloadCaptcha')}`}/>
                <InputField
                  placeholder={`${t('global.captcha')}`}
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
                      type="button"
                      color="gradient"
                      varient="bordered"
                      radius="md"
                      clickHandler={() => resetForm()}
                    >
                      {t('global.clear')}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default UDSICode;
