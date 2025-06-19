
export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const APPIMAGES = {
  IMG1: '/nilp/images/logos/nic_logo.svg',
  IMG2: '/nilp/images/logos/azadi_logo.svg',
  IMG3: '/nilp/images/logos/department_logo.svg',
  IMG4: '/nilp/images/logos/top_header_logos.svg',
  IMG5: '/nilp/images/logos/ullas_logo.png',
  IMG6: '/nilp/images/img_1.png',
  IMG7: '/nilp/images/img_3.png',
  IMG8: '/nilp/images/logos/department_logo_black.png',
  IMG9: '/nilp/images/img_4.png',
  IMG10: '/nilp/images/img_4.png',
  IMG11: '/nilp/images/img_4.png',
  IMG12: '/nilp/images/india_statistial.svg',
  IMG13: '/nilp/images/india_map.svg',
  IMG14: '/nilp/images/logos/logo.svg',
  IMG15: '/nilp/images/logos/res_logo.svg',
  IMG16: '/nilp/images/newicon.gif',
  IMG17: '/nilp/images/logos/meo_white.png',

  ICON3: '/nilp/images/icons/user.svg',
  ICON4: '/nilp/images/icons/menu.svg',
  ICON5: '/nilp/images/icons/register.svg',
  ICON6: '/nilp/images/icons/india.svg',
  ICON7: '/nilp/images/icons/pattern_2.png',
  ICON8: '/nilp/images/icons/icon_1.svg',
  ICON9: '/nilp/images/icons/apple_store.png',
  ICON10: '/nilp/images/icons/apple_store_white.svg',
  ICON11: '/nilp/images/icons/google_play.png',
  ICON12: '/nilp/images/icons/google_play_white.svg',
  ICON13: '/nilp/images/icons/email_white.svg',
  ICON14: '/nilp/images/icons/phone_white.svg',
  ICON15: '/nilp/images/icons/facebook_white.svg',
  ICON16: '/nilp/images/icons/youtube_white.svg',
  ICON17: '/nilp/images/icons/app_screen.png',
  ICON18: '/nilp/images/icons/phone_outline.svg',
};

export const instruction = [
  { value: 'Hindi', label: 'Hindi' },
  { value: 'English', label: 'English' },
  { value: 'Assamese', label: 'Assamese' },
  { value: 'Bengali', label: 'Bengali' },
  { value: 'Bodo', label: 'Bodo' },
  { value: 'Dogri', label: 'Dogri' },
  { value: 'Gujarati', label: ' Gujarati' },
  { value: 'Kannada', label: 'Kannada' },
  { value: 'Kashmiri', label: 'Kashmiri' },
  { value: 'Konkani', label: 'Konkani' },
  { value: 'Maithili', label: 'Maithili' },
  { value: 'Malayalam', label: 'Malayalam' },
  { value: 'Manipuri', label: 'Manipuri' },
  { value: 'Marathi', label: 'Marathi' },
  { value: 'Nepali', label: 'Nepali' },
  { value: 'Odia', label: 'Odia' },
  { value: 'Punjabi', label: 'Punjabi' },
  { value: 'Sanskrit', label: 'Sanskrit' },
  { value: 'Santhali', label: 'Santhali' },
  { value: 'Sindhi', label: 'Sindhi' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Garo', label: 'Garo' },
  { value: 'Khasi', label: 'Khasi' },
  { value: 'Mizo', label: 'Mizo' },
  { value: 'Kokborok', label: 'Kokborok' },
];

export const professionOption = [
  {
    value: '5',
    label: 'Agriculture/Animal Husbandry & Dairy',
  },
  { value: '11', label: 'Any other Occupation' },
  { value: '8', label: 'Construction' },
  { value: '2', label: 'Contract Employee' },
  { value: '1', label: ' Daily Wager' },
  { value: '10', label: 'Garments/Fashion Industry' },
  { value: '12', label: 'Self Employed' },
  {
    value: '3',
    label: 'Technician/Technical personnel',
  },
  { value: '6', label: 'Vendors' },
];

export const gender = [
  {
    value: 'm',
    label: 'Male',
  },
  {
    value: 'f',
    label: 'Female',
  },
  {
    value: 't',
    label: 'Transgender',
  },
];

export const proof_type: Option[] = [
  { value: '4', label: 'Driving License' },
  { value: '9', label: 'Labour Card' },
  { value: '8', label: 'MGNREGA Job Card' },
  { value: '6', label: 'NPR Smart Card' },
  { value: '2', label: 'PAN Card' },
  { value: '5', label: 'Passport' },
  { value: '11', label: 'Prisoner ID' },
  { value: '3', label: 'Ration Card' },
  { value: '7', label: 'Student ID Card' },
  { value: '1', label: 'Voter ID' },
];

export const social: Option[] = [
  { value: '4', label: 'General' },
  { value: '3', label: 'Minority' },
  { value: '5', label: 'OBC' },
  { value: '1', label: 'SC' },
  { value: '2', label: 'ST' },
];

export const learningmode: Option[] = [
  { value: '2', label: 'Online' },
  { value: '1', label: 'Offline' },
];
const options: { value: string; label: string }[] = [];

//  const age = () => {
//   if (options.length === 0) { // Check to avoid re-population
//     for (let i = 15; i <= 100; i++) {
//       options.push({ value: i.toString(), label: i.toString() });
//     }
//   }
//   return options;
// };

// // Example usage
// export const ageOptions = age();

export const education= [
  { value: '4', label: 'General' },
  { value: '3', label: 'Higher Secondary' },
  { value: '5', label: 'Other' },
  { value: '1', label: 'Post Graduate and above' },
  { value: '2', label: 'Secondary' },
];


export const teacher_type= [
  { value: '1', label: 'College Student' },
  { value: '6', label: 'NCC' },
  { value: '3', label: ' NCTE Student' },
  { value: '5', label: ' NYK' },
  { value: '0', label: ' Other' },
  { value: '2', label: ' School Student' },
  { value: '4', label: ' Volunteer of NSS' },
];

export const TWOFACTORSLIDER = [
  {
    id: 1,
    heading: 'Enter Mobile Number, Password & Captcha as shown',
    img: '/nilp/images/two-factor-step1.png',
  },
  {
    id: 2,
    heading: 'Click on Login',
    img: '/nilp/images/two-factor-step2.png',
  },
  {
    id: 3,
    heading:
      'Go to google play Store, Search for Google authenticator and download it',
    img: '/nilp/images/two-factor-step3.png',
  },
  {
    id: 4,
    heading:
      'Scan the QR code on screen and enter the code on your app from Google authenticator and click on verify',
    img: '/nilp/images/two-factor-step4.png',
  },
];

export const TWOFACTORSLIDERPORTAL = [
  {
    id: 1,
    heading: 'Enter Mobile Number, Password & Captcha as shown',
    img: '/nilp/images/image.png',
  },
  {
    id: 2,
    heading: 'Click on Login',
    img: '/nilp/images/image2.png',
  },
  {
    id: 3,
    heading:
      'Go to google play Store, Search for Google authenticator and download it',
    img: '/nilp/images/img2.png',
  },
  {
    id: 4,
    heading:
      'Scan the QR code on screen and enter the code on your app from Google authenticator and click on verify',
    img: '/nilp/images/img3.png',
  },
];