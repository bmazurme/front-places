import React from 'react';

import { useIsAuthenticated } from '../../hooks/use-is-authenticated';

import style from './protected-wrapper.module.css';

function ProtectedWrapper({
  children,
  requiredRoles = [],
  fallback = null,
  anyRole = false,
}: {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallback?: React.ReactNode;
  anyRole?: boolean;
}) {
  const { isAuthenticated, isChecking } = useIsAuthenticated();
  const userRoles: string[] = [];

  if (isChecking) {
    return (
      <span className={style.hidden} aria-hidden="true">
        {children}
      </span>
    );
  }

  if (!isAuthenticated) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{fallback}</>;
  }

  if (requiredRoles.length === 0) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  const hasRequiredRole = anyRole
    ? requiredRoles.some((role) => userRoles.includes(role))
    : requiredRoles.every((role) => userRoles.includes(role));

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{hasRequiredRole ? children : fallback}</>;
}

export default ProtectedWrapper;
