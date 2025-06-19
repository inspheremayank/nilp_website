import { ChangeEvent, FC } from 'react';
import { handleCopyPaste } from '@/config/globalUtils';


interface InputProps {
  type: 'text' | 'number' | 'email' | 'password';
  label?: string;
  value: string | number;
  name: string;
  placeholder: string;
  errors?: any;
  touched?: any;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: any;
  reference?: any;
  cls?:any;
}

const InputField: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  touched,
  placeholder,
  errors,
  disabled,
  maxLength,
  minLength,
  onChange,
  onBlur,
  onKeyDown,
  reference,
  cls
}) => {


  return (
    <>
      <div
        className={`form_grider_wrap ${errors && touched ? 'hasError' : ''} ${cls}`}
      >
        {label && <label className="form_grider_wrap_label">{label}</label>}
        <input
          type={type}
          id={label}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          className="form_grider_wrap_field"
          onKeyDown={onKeyDown}
          ref={reference}
          autoComplete="off"
          onCopy={handleCopyPaste}
          onCut={handleCopyPaste}
          onPaste={handleCopyPaste}
        />
        {errors && touched ? (
          <p className="form_grider_wrap_helper">{errors}</p>
        ) : null}
      </div>
    </>
  );
};

export default InputField;
