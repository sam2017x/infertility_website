import React from 'react';
import logo from '../public/images/logo.png';
import translate from '../util/localization/i18n';

const Navibar = props => (
  <div className="navibar">
    <div className="navicont">
      <div className="navi">
        {props.logged && <><div style={{float:'left',marginLeft:'10px'}}>{translate('naviHello')} {window.localStorage.getItem('user')}</div></>}

        <a href="#" onClick={() => props.setView('main')} className="navimain">{translate('naviHome')}</a>
        {!props.logged && <a href="#" onClick={() => props.setView('login')} className="navilog">{translate('naviLogin')}</a>}
        {props.logged && <a href="#" onClick={() => props.setView('settings')} className="navilog">{translate('naviSettings')}</a>}
        {props.logged && <a href="#" onClick={() => props.setView('admin')} className="navilog">{translate('naviData')}</a>}
        <a href="#" onClick={() => props.setView('about')} className="naviabout">{translate('naviAbout')}</a>
        {props.logged && <a href="#" onClick={() => {window.localStorage.clear();props.updateNavi();props.setView('login');}}>{translate('naviLogout')}</a>}
        <div className="lang-container">
          <a href="#" onClick={() => props.setLang('fi')} className={ document.documentElement.lang === 'fi' ? 'active' : '' }>fi</a>
          <span>/</span>
          <a href="#" onClick={() => props.setLang('en')} className={ document.documentElement.lang === 'en' ? 'active' : '' }>en</a>
        </div>
      </div>
    </div>
  </div>
);


export default Navibar;
