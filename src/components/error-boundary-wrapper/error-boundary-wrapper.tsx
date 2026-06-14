import React from 'react';
import { Link } from 'react-router-dom';
import type { PropsWithChildren } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import classNames from 'classnames';

import Content from '../content';
import Button from '../button';

import style from './error-boundary.module.css';

type ErrorBoundaryWrapperProps = PropsWithChildren<unknown>;

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Content
      children={(
        <div className={style.boundary}>
          <h2 className={style.title}>APP-ERROR</h2>
          <p className={style.message}>{error.message}</p>
          <div className={style.block}>
            Try to
            <Button className={style.button} onClick={resetErrorBoundary} variant="outline">
              Reload app
            </Button>
            or
            <Button
              className={classNames('link', style.link)}
              onClick={resetErrorBoundary}
              variant="outline"
              as={Link}
              to="/"
            >
              Go to homepage
            </Button>
          </div>
        </div>
      )}
    />
  );
}

export default function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundary onReset={() => console.log('reset')} FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
