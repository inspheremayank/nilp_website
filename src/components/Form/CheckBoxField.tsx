import { FC } from 'react';
interface InputProps {
  label: string;
  children: any;
  cls?:string;
}

const CheckBoxField: FC<InputProps> = ({ label, children, cls }) => {
  return (
    <>
      <div className={`form_grider_wrap checkbox_field ${cls !== "" && cls != undefined ? cls : ''}`}>
        {label && <label className="form_grider_wrap_label">{label}</label>}

        {/* {errors && touched ? <p className="form_grider_wrap_helper">{errors}</p> : null} */}
        <div className="checkbox_container">{children}</div>
      </div>
    </>
  );
};

export default CheckBoxField;
