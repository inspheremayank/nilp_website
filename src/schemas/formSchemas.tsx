import * as Yup from 'yup';

export const LearnerRegisterSchema = Yup.object({
  fullname: Yup.string().required('full name is required').trim().matches(/^[^!@#$%^&*()+=_\-[\]';,./{}|\\":<>?]*$/, 'special characters  are not allowed'),
  address: Yup.string().required('address is required').trim(),
  mother_name: Yup.string().trim().matches(/^[^!@#$%^&*()+=_\-[\]';,./{}|\\":<>?]*$/, 'special characters  are not allowed'),
  father_name: Yup.string().trim().matches(/^[^!@#$%^&*()+=_\-[\]';,./{}|\\":<>?]*$/, 'special characters  are not allowed'),
  age: Yup.string().required('age is required'),
  gender: Yup.string().required('gender is required'),
  social_category_id: Yup.string().required('social category is required'),
  proof_type: Yup.string().required('id type is required'),
  proof_detail: Yup.string().required('id number is required'),
  profession: Yup.string().required('profession is required'),
  learning_mode: Yup.string().required('teaching mode is required'),
  course_taught_in_language: Yup.string().required(
    'medium of instruction is required'
  ),
  mobile: Yup.string()
    .required('mobile number is required')
    .min(10, '10 digit mobile number is required'),
  state: Yup.string().required('state is required'),
  district: Yup.string().required('district is required'),
  reCaptcha: Yup.string()
  .required('captcha is required')
  .max(6, 'captcha must be at most 6 characters').min(6, 'captcha must be 6 characters'),
  mark_as: Yup.string(),
  school:  Yup.string(),
  relation:  Yup.string(),

});

export const VTRegisterSchema = Yup.object({
  fullname: Yup.string().required('full name is required').trim().matches(/^[^!@#$%^&*()+=_\-[\]';,./{}|\\":<>?]*$/, 'special characters  are not allowed'),
  address: Yup.string().required('address is required').trim(),
  mother_name: Yup.string().trim().matches(/^[^!@#$%^&*()+=_\-[\]';,./{}|\\":<>?]*$/, 'special characters  are not allowed'),
  father_name: Yup.string().trim().matches(/^[^!@#$%^&*()+=_\-[\]';,./{}|\\":<>?]*$/, 'special characters  are not allowed'),
  age: Yup.string().required('age is required'),
  gender: Yup.string().required('gender is required'),
  learning_mode: Yup.string().required('teaching mode is required'),
  social_category_id: Yup.string().required('social category is required'),
  proof_type: Yup.string().required('id type is required'),
  proof_detail: Yup.string().required('id number is required'),
  profession: Yup.string().required('profession is required'),
  education: Yup.string().required('education is required'),
  no_of_beneficiaries_to_be_taught: Yup.string().required('beneficiaries is required'),
  vt_type: Yup.string().required('voluntary teacher type is required'),
  course_taught_in_language: Yup.string().required(
    'medium of instruction is required'
  ),
  mobile: Yup.string()
    .required('mobile number is required')
    .min(10, '10 digit mobile number is required'),
  state: Yup.string().required('state is required'),
  district: Yup.string().required('district is required'),
  reCaptcha: Yup.string()
  .required('captcha is required')
  .max(6, 'captcha must be at most 6 characters').min(6, 'captcha must be 6 characters'),
  
});

export const captchaSchema = Yup.object({
  reCaptcha: Yup.string()
  .required('captcha is required')
  .max(6, 'captcha must be at most 6 characters').min(6, 'captcha must be 6 characters')
})