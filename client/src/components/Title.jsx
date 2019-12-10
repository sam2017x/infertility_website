import React from 'react';
import logo from '../public/images/logo.png';
import translate from '../util/localization/i18n';

const Title = props => (
  <div className="title-container">
    <div className="title-img">
      <img src={logo} alt="logo" />
    </div>
    <div className="title-text">
      <h2>{ translate('mainTitle') }</h2>
      <p>
        { translate('mainContent1') }
        &nbsp;
        <span onClick={() => props.setView('about')}>{ translate('mainAbout') }</span>
        &nbsp;
        { translate('mainContent2') }
      </p>

    </div>
  </div>
);

export default Title;
