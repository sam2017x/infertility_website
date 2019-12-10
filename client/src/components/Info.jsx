import React from 'react';
import ReactTooltip from 'react-tooltip';
import translate from '../util/localization/i18n';

const Info = () => (
  <div>
    <div style={{ position: 'relative', bottom: '50px' }} data-tip data-for="global" className="form-group-info"> ? </div>
    <ReactTooltip id="global" delayHide={300} clickable={true} effect="solid">
      <div className="tooltip">
        <h3 style={{ textAlign: 'center' }}>{ translate('infoTitle') }</h3>
        <p style={{ textAlign: 'left' }}>
          <ins>
            { translate('infoAgeTitle') }
          </ins>
          &nbsp;
          { translate('infoAge') }
          <br />
          <br />
          <ins>
            { translate('infoGonaTitle') }
          </ins>
          &nbsp;
          { translate('infoGona') }
          <br />
          <br />
          <ins>
            { translate('infoOocTitle') }
          </ins>
          &nbsp;
          { translate('infoOoc') }
          <br />
          <br />
          <ins>
            { translate('infoCleavTitle') }
          </ins>
          &nbsp;
          { translate('infoCleav') }
          <br />
          <br />
          <br />
          <ins>
            { translate('infoTopTitle') }
          </ins>
          &nbsp;
          { translate('infoTop1') }
          &nbsp;
          <b>{ translate('infoTopAbout') }</b>
          &nbsp;
          { translate('infoTop2') }
          <br />
          <br />
          <ins>
            { translate('infoDiagnosisTitle') }
          </ins>
          &nbsp;
          { translate('infoDiagnosis') }
        </p>
      </div>
    </ReactTooltip>
  </div>
);

export default Info;
