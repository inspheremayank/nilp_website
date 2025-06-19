import RegisterScreen from '@/elements/RegistrationProcess/RegisterScreen';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Register | ULLAS',
  description: 'ULLAS',
};

const Register = ({ searchParams }: any) => {
  //searchParams.tab != 'direct' (add this to enable direct registration)
  if (
    searchParams.tab != undefined &&
    searchParams.tab != 'school'
  ) {
    redirect('/register-tagging?tab=registration');
  }

  return (
    <>
      <div className="c-innerBanner v2 empty_box"></div>
      <RegisterScreen />
      
    </>
  );
};

export default Register;
  