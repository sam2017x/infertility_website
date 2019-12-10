import React from 'react';
import errorlogo from '../public/images/errorlogo.png';
import oops from '../public/images/oops.png';

const ErrorPage = () => {
  document.body.style.backgroundColor = '#f7f7f7';
  return (
    <div className="error-container">
      <div className="errorlogo">
        <img src={errorlogo} alt="logo" />
      </div>
      <div className="oops">
        <img src={oops} alt="logo" />
      </div>
    </div>
  );
};

export default ErrorPage;
