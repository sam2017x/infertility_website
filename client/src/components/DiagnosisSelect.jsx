import React from 'react';
import translate from '../util/localization/i18n';


// const diagnosisStr = ['unexplained', 'endometriosis', 'anovulation', 'male factor', 'tubal factor']

const Diagnosis = ({ value, name, label, onChange, opts: { dirty, invalid } }) => {
  return (
    <div className="form-footer-field">
      <label className="diagnosislabel" htmlFor={name} id={`${name}-label`}>{label}</label>
      <div className="input-wrapper">
        <select value={value || ''} onChange={event => onChange(event)}>
          <option value="valitse">{translate('selectChoose')}</option>
          <option value="0">{translate('selectUnexplained')}</option>
          <option value="1">{translate('selectEndo')}</option>
          <option value="2">{translate('selectAno')}</option>
          <option value="3">{translate('selectMalef')}</option>
          <option value="4">{translate('selectTubal')}</option>
        </select>
        { dirty && invalid
          && <span className="field-validation-message">{invalid}</span>
        }
      </div>
    </div>
  );
};

export default Diagnosis;
