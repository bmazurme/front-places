import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import Button from '../../../../ui/button';
import InputField from '../../../../ui/input-field';
import UploadButton from '../../../../ui/upload-button';

type FormPayload = {
  name: string;
  tagName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // file: any;
  link: string;
};

const inputs = [
  {
    name: 'name',
    label: 'Name',
    pattern: {
      value: /^[\s+$.a-zA-Z0-9_-]{3,25}$/,
      message: 'Name is invalid',
    },
    // disabled: false,
    required: true,
    autoComplete: 'current-name',
  },
  {
    name: 'tagName',
    label: 'Tag',
    pattern: {
      value: /^[\s+$.a-zA-Z0-9_-]{3,25}$/,
      message: 'Tag is invalid',
    },
    // disabled: false,
    required: true,
    autoComplete: 'current-name',
  },
];

export default function AddCard({ isLoading, onAddPlace }
: {
    isLoading: boolean;
    onAddPlace: (data: { name: string; link: string; tagName: string }) => void;
  }) {
  const errorHandler = useErrorHandler();
  const [editor, setEditor] = useState<File | string | null>(null);
  const buttonText = isLoading ? 'Loading...' : 'Save';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: { name: '', link: '', tagName: '' },
  });
  const onSubmit = handleSubmit(async (data: FormPayload) => {
    try {
      // const form = new FormData();

      // if (editor) {
      //   form.append('name', data.name);
      //   form.append('tagName', data.tagName);
      //   form.append('files', editor);
      // }

      // onAddPlace(form);
      onAddPlace({ name: data.name, tagName: data.tagName, link: editor as string });
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <form className="form form_type_edit" onSubmit={onSubmit}>
      <h2 className="title">New place</h2>
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
            <InputField
              {...field}
              {...input}
              black
              errorText={fieldState.error?.message}
            />
          )}
        />
      ))}
      <UploadButton setEditor={setEditor} />
      <Button
        className="submit"
        variant="filled"
        disabled={!editor}
      >
        {buttonText}
      </Button>
    </form>
  );
}
