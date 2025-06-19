import { FC } from 'react';
interface InputProps {
  label: string;
  children: any;
}
const RadioField: FC<InputProps> = ({ label, children }) => {
  return (
    <>
      <div className={`form_grider_wrap radio_field`}>
        {label && <label className="form_grider_wrap_label">{label}</label>}
        {/* {errors && touched ? <p className="form_grider_wrap_helper">{errors}</p> : null} */}
        <div className="radio_container">{children}</div>
      </div>
    </>
  );
};

export default RadioField;
