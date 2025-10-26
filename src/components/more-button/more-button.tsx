import React from 'react';
import classNames from 'classnames';
import { IconType } from 'utils/icons';

import { BiChevronDown } from '../../utils/icons/bi';

import style from './more-button.module.css';

type MoreButtonPropsType = {
  handler: () => void;
  disabled?: boolean;
  extraClass?: CSSImportRule;
  children?: IconType;
};

export default function MoreButton({
  handler, disabled, extraClass, children: Component,
}: MoreButtonPropsType) {
  return (
    <button
      type="button"
      aria-label="Add"
      className={classNames(style.button, { [style.disabled]: disabled }, extraClass)}
      disabled={disabled}
      onClick={handler}
    >
      {Component ? <Component size={36} /> : <BiChevronDown size={36} />}
    </button>
  );
}
