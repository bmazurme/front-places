import React from 'react';
import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

import classNames from 'classnames';

import style from './button.module.css';

type ButtonProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  className?: string;
  variant: 'filled' | 'outline' | 'link' | 'icon';
  disabled?: boolean;
}> & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant' | 'children'>;

export default function Button<T extends ElementType = 'button'>({
  as, className, disabled, variant, ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button';

  return (
    <Component
      className={classNames(
        style.button,
        className,
        { [style.disabled]: disabled },
        { [style.filled]: variant },
      )}
      disabled={disabled}
      {...props}
    />
  );
}
