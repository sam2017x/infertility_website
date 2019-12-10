import React from 'react';
import { useCookies } from 'react-cookie';

const Gdpr = () => {
  const [cookies, setCookie] = useCookies(['gdpr']);

  const confirm = () => {
    setCookie('gdpr', 'false', { path: '/' });
  };

  if (cookies.gdpr === 'false'){
    return null;
  }


  return(
        <div className='gdpr-notice'>
            <div className='gdpr-content'>
                General data protection rules (GDPR): We comply with GDPR and do not store or use your personal data. <button onClick={confirm}>OK</button>
            </div>
        </div>
  );
};

export default Gdpr;