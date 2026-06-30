import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import type { ChangeEvent, DragEvent } from 'react';

import Button from '../../../button';

import { BiCloudUpload, BiPlus } from '../../../../utils/icons/bi';
import { useUploadFileMutation } from '../../../../store';

import { inputs } from './inputs';

import style from './add-card.module.css';

type FormPayload = {
  name: string;
  tagName: string;
};

type AddCardProps = {
  isLoading: boolean;
  onAddPlace: (data: { name: string; link: string; tagName: string }) => void;
  onClose: () => void;
};

export default function AddCard({ isLoading, onAddPlace, onClose }: AddCardProps) {
  const errorHandler = useErrorHandler();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [photo, setPhoto] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const buttonText = isLoading ? 'Loading...' : 'Publish entry';
  const { control, handleSubmit } = useForm<FormPayload>({
    defaultValues: { name: '', tagName: '' },
  });

  const handleChoosePhoto = () => fileInputRef.current?.click();

  const handleRemovePhoto = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setPhoto(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadPhoto = async (file: File | undefined) => {
    if (!file?.type.match('image.*')) {
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    const formData = new FormData();
    formData.append('file', file, file.name);

    const result = await uploadFile(formData) as { data?: { filename: string } };
    const filename = result.data?.filename;

    if (!filename) {
      toast('Failed to upload photo. Check your connection and try again.', { type: 'error', position: 'top-right', autoClose: 5000 });
      URL.revokeObjectURL(objectUrl);
      setPreview(null);
      setPhoto(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      return;
    }

    setPhoto(filename);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => uploadPhoto(e.target.files?.[0]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    uploadPhoto(e.dataTransfer.files?.[0]);
  };

  const onSubmit = handleSubmit(async (data: FormPayload) => {
    try {
      onAddPlace({ name: data.name, tagName: data.tagName, link: photo as string });
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <div className={style.head}>
        <span className={style.eyebrow}>New entry</span>
        <h2 className={style.title}>New place</h2>
      </div>
      <div className={style.body}>
        <div className={style.photo}>
          <div
            className={classNames(style.preview, { [style.dragging]: isDragging })}
            role="button"
            tabIndex={0}
            aria-label="Choose photograph"
            style={preview ? { backgroundImage: `url(${preview})` } : undefined}
            onClick={handleChoosePhoto}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleChoosePhoto(); }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!preview && (
              <span className={style.previewEmpty}>
                <BiCloudUpload size={28} />
                {isUploading ? 'Uploading…' : 'Drop / choose'}
              </span>
            )}
          </div>
          <div className={style.side}>
            <span className={style.label}>Photograph</span>
            <div className={style.photoActions}>
              <Button
                type="button"
                variant="outline"
                className={classNames(style.btn, style.ghost, style.photoBtn)}
                onClick={handleChoosePhoto}
              >
                Choose file
              </Button>
              {preview && (
                <Button
                  type="button"
                  variant="outline"
                  className={classNames(style.btn, style.ghost, style.photoBtn)}
                  onClick={handleRemovePhoto}
                >
                  Remove
                </Button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={style.fileInput}
              onChange={handlePhotoChange}
            />
          </div>
        </div>
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
                <input
                  {...field}
                  id={input.name}
                  type="text"
                  className={style.input}
                  placeholder={input.placeholder}
                  autoComplete={input.autoComplete}
                />
                {fieldState.error?.message && (
                  <span className={style.error}>{fieldState.error.message}</span>
                )}
              </label>
            )}
          />
        ))}
      </div>
      <div className={style.foot}>
        <Button
          type="button"
          variant="outline"
          className={classNames(style.btn, style.ghost)}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="filled"
          className={classNames(style.btn, { [style.disabled]: !photo || isLoading })}
          disabled={!photo || isLoading}
        >
          <BiPlus size={15} />
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
