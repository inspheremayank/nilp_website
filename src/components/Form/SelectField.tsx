import { ChangeEvent, FC } from 'react';
import Select from 'react-select';

interface InputProps {
  label?: string;
  value: any;
  name: string;
  placeholder: string;
  errors?: any;
  reference?:any;
  touched?: any;
  options: any;
  disabled?: boolean;
  onChange: any;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: any;

  defaultValue?:any;
}

const SelectField: FC<InputProps> = ({
  label,
  name,
  errors,
  touched,
  options,
  placeholder,
  disabled,
  onChange,
  onKeyDown,

  onBlur,
  reference,
  defaultValue
}) => {
  return (
    <>
      <div
        className={`form_grider_wrap ${errors && touched ? 'hasError' : ''}`}
      >
        {label && <label className="form_grider_wrap_label">{label}</label>}

        <Select
          ref={reference}
          className="form_grider_wrap_field select_field"
          classNamePrefix="react-select"
          placeholder={placeholder}
          onChange={onChange}
          options={options}
          defaultValue={defaultValue}
          onKeyDown={onKeyDown}

          // menuIsOpen={true}
        />
        {errors && touched ? (
          <p className="form_grider_wrap_helper">{errors}</p>
        ) : null}
      </div>
    </>
  );
};

export default SelectField;
