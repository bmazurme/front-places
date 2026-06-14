import React, {
  useRef,
  useState,
  useCallback,
  type ChangeEvent,
} from 'react';
import classNames from 'classnames';

import { BiCloudUpload } from '../../utils/icons/bi';
import { useUploadFileMutation } from '../../store';

import style from './upload-button.module.css';

type UploadButtonPropsType = { setEditor: (file: File | string | null) => void; }

export default function UploadButton({ setEditor }: UploadButtonPropsType) {
  const [uploadFile] = useUploadFileMutation();
  const elementInputFile = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const onInputChange = useCallback(async (evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.target;
    const validateImgFile = (file: File | undefined) => !!file?.type.match('image.*');

    if (!files?.[0] || !validateImgFile(files[0])) {
      return;
    }

    const file = files[0];
    setName(file.name);
    // setEditor(file);
    // console.log(file.name);

    const formdata = new FormData();
    formdata.append('file', file, file.name);

    const result = await uploadFile(formdata); // !!! rew !!!
    // console.log(result);
    // console.log((result as { data: { link: string } }).data?.link);
    setEditor((result as { data: { filename: string } }).data?.filename); // !!! rew !!!
    // eslint-disable-next-line no-alert
    // alert(0);
  }, []);

  return (
    <div className={style.container}>
      <label className={classNames(style.label)} htmlFor="file">
        <input
          id="file"
          type="file"
          ref={elementInputFile}
          onChange={onInputChange}
          className={classNames(style.input)}
        />
        <BiCloudUpload size={36} />
      </label>
      <span className={classNames(style.link)}>{name}</span>
    </div>
  );
}
