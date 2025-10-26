import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundLayout() {
  return (
    <div className="error">
      <h2 className="error__title">404</h2>
      <h3 className="error__description">Page not found</h3>
      <Link className="error__link" to="/">Home</Link>
    </div>
  );
}
