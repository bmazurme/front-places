/* eslint-disable */
import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { type InputHTMLAttributes } from 'react';

import style from './input-field.module.css';

type OwnProps = {
  id?: string;
  label?: string;
  black?: boolean;
  errorText?: string;
  readonly?: boolean;
};
export type InputProps = OwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'pattern'>;

const InputField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    errorText = '', type, onChange, label, id, value, placeholder, className, black, readonly,
  } = props;
  return (
    <div className={style['text-field']}>
      {label
        && <label
          htmlFor={id}
          className={classNames(
            style.label,
            { [style.label_error]: errorText },
            { [style.black]: black },
          )}
        >
          {label}
        </label>}
      <input
        ref={ref}
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        className={classNames(style.input, className)}
        readOnly={readonly}
      />
      {errorText
        && <span className={classNames(style.error, style.help, `${label}-input-error`)}>
             {errorText}
           </span>}
    </div>);
});

export default InputField;
