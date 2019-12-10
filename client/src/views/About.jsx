import React from 'react';
import translate from '../util/localization/i18n';

import HYlogo from '../public/images/HY_logo_new.png';
import metropolialogo from '../public/images/metropolia.png';

const About = props => (
  <div className="abt">
    <h1>
        {translate('aboutH1')}<br />
    </h1>
    <h2>{translate('aboutH2_1')}</h2>
      <p>
      {translate('aboutP1_1')}
      </p>

      <p>
      {translate('aboutP1_2')}
      </p>

      <p>
      {translate('aboutP1_3')}
      </p>

      <p>
      {translate('aboutP1_4')}
      </p>

      <p>
      {translate('aboutP1_5')}
      </p>

    <h2>{translate('aboutH2_2')}</h2>
      <p>
      {translate('aboutP2_1')}
      </p>

      <p>
      {translate('aboutP2_2')}
      </p>

      <p>
      {translate('aboutP2_3')}
      </p>

    <h2>{translate('aboutH2_3')}</h2>
      <p>
      {translate('aboutP3_1')}
      </p>

    <h2>{translate('aboutH2_4')}</h2>
      <p>
      {translate('aboutP4_1')}
      </p>

    <h2>{translate('aboutH2_5')}</h2>
      <p>
      {translate('aboutP5_1')}
      </p>

    <h2>{translate('aboutH2_6')}</h2>
      <p>
      {translate('aboutP6_1')}
      </p>
      <p>
      {translate('aboutP6_2')}<br/>{translate('aboutP6_3')}<br/>{translate('aboutP6_4')}<br/>
      </p>

    <h2>-</h2>
    <ul className="about-name-list"> 
      <li>
        <small>{translate('version')}1.1</small>
      </li>
      <li>
        <p style={{fontSize: 10}}>{translate('code')} Samuli J.</p>
      </li>
    </ul>
    <div className="logo-wrapper">
      <img className="hylogo institute-logo" src={HYlogo} alt="logo" />
    </div>
  </div>
);


export default About;
