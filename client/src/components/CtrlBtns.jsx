import React from 'react';
import ReactTooltip from 'react-tooltip';
import translate from '../util/localization/i18n';

const CtrlBtns = props => (
  <div className="ctrl-buttons">
    <div className="btn-ctrl btn-add" data-tip={translate('addStimulation')}>
      <input type="button" onClick={props.addGroup} id="add" disabled={props.disadd} />
    </div>
    <div className="btn-ctrl btn-rmv" data-tip={translate('rmvStimulation')}>
      <input type="button" onClick={props.removeGroup} id="rmv" disabled={props.disrmv} />
    </div>
    <ReactTooltip place="right" effect="solid" type="light" />
  </div>
);

export default CtrlBtns;
