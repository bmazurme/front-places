import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';
import classNames from 'classnames';

import Button from '../../../button';

import { inputs } from './inputs';

import style from './edit-profile.module.css';

type FormPayload = {
  name: string;
  about: string;
};

type EditProfileProps = {
  info: User | null;
  isLoading: boolean;
  onUpdateUser: (data: FormPayload) => void;
  onClose: () => void;
};

export default function EditProfile({
  info, isLoading, onUpdateUser, onClose,
}: EditProfileProps) {
  const errorHandler = useErrorHandler();
  const buttonText = isLoading ? 'Loading...' : 'Save changes';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: info ?? { name: '', about: '' },
  });

  const onSubmit = handleSubmit(async (data: FormPayload) => {
    try {
      onUpdateUser(data);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <div className={style.head}>
        <span className={style.eyebrow}>Account</span>
        <h2 className={style.title}>Edit profile</h2>
      </div>
      <div className={style.body}>
        {inputs.map((input) => (
          <Controller
            key={input.name}
            name={input.name as keyof FormPayload}
            rules={{
              pattern: input.pattern,
              required: input.required,
            }}
            control={control}
            render={({ field, fieldState }) => (
              <label className={style.field} htmlFor={input.name}>
                <span className={style.label}>{input.label}</span>
                {input.type === 'about' ? (
                  <textarea
                    {...field}
                    id={input.name}
                    className={style.textarea}
                    rows={3}
                    autoComplete={input.autoComplete}
                  />
                ) : (
                  <input
                    {...field}
                    id={input.name}
                    type="text"
                    className={style.input}
                    autoComplete={input.autoComplete}
                  />
                )}
                {fieldState.error?.message && (
                  <span className={style.error}>{fieldState.error.message}</span>
                )}
              </label>
            )}
          />
        ))}
      </div>
      <div className={style.foot}>
        <Button type="button" variant="outline" className={classNames(style.btn, style.ghost)} onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="filled"
          className={classNames(style.btn, { [style.disabled]: isLoading })}
          disabled={isLoading}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
