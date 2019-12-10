import React from 'react';
import translate from '../util/localization/i18n';

const getDiagnosis = (val) => {
  const diagnosisList = [
    translate('selectUnexplained'),
    translate('selectEndo'),
    translate('selectAno'),
    translate('selectMalef'),
    translate('selectTubal')
  ];
  return diagnosisList[val] || '';
};

const PrintView = ({ formState }) => (
  <div className="printview">
    { formState.formGroups && formState.formGroups.map(group => (
      <div key={`stimulation-wrapper-${group.stimulation}`} className="stimulation-wrapper">
        <h2 key={`stimulation-title-${group.stimulation}`} className="stimulation-title">
          { `${translate('stimulation')} ${group.stimulation + 1}` }
        </h2>
        <div key={`stimulation-content-${group.stimulation}`} className="stimulation-content">
          <dl className="labeled-list">
            { group.fields.map(field => (
              <React.Fragment key={`field-${group.stimulation}-${field.name}`}>
                <dt key={`label-${group.stimulation}-${field.name}`}>
                  { field.label }
                </dt>
                <dd key={`value-${group.stimulation}-${field.name}`}>
                  { field.value || '' }
                </dd>
                <hr />
              </React.Fragment>
            )) }
          </dl>
        </div>
      </div>
    ))
    }
    <div className="additional-info-wrapper">
      <h2 className="additional-info-title">{translate('printAdditional')}</h2>
      <div className="additional-info-content">
        <dl className="labeled-list">
          <dt>
            { formState.diagnosis.label }
          </dt>
          <dd>
            { getDiagnosis(formState.diagnosis.value) }
          </dd>
          <hr />
          <dt>
            { formState.rfield.label }
          </dt>
          <dd>
            { formState.rfield.value || translate('printNotChosen') }
          </dd>
        </dl>
      </div>
    </div>
  </div>
);

export default PrintView;
