import React from 'react';
import Info from '../components/Info';
import FormGroup from '../components/FormGroup';
import Input from '../components/Input';
import Radio from '../components/Radio';
import Button from '../components/Button';
import Diagnosis from '../components/DiagnosisSelect';
import CtrlBtns from '../components/CtrlBtns';
import PrintView from '../components/PrintView';

import Validation from '../util/validation/Index';
import translate from '../util/localization/i18n';
// import addIcon from '../public/images/add_icon.png';

const newFormGroup = stimulation => ({
  stimulation,
  fields: [
    { name: 'age', label: translate('labelAge'), value: null, type: 'text', ...Validation('age') },
    { name: 'dose', label: translate('labelDose'), value: null, type: 'text', ...Validation('dose') },
    { name: 'oocytes', label: translate('labelOocytes'), value: null, type: 'text', ...Validation('oocyte') },
    { name: 'cleaving', label: translate('labelCleaving'), value: null, type: 'text', ...Validation('cleaving') },
    { name: 'top', label: translate('labelTop'), value: null, type: 'text', ...Validation('top') }
  ]
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formGroups: [newFormGroup(0)],
      diagnosis: { name: 'diagnosis', label: translate('labelDiagnosis'), value: 'valitse', type: 'select', ...Validation('diagnosis') },
      rfield: { name: 'ocu', label: translate('labelStatus'), value: null, type: 'radio', val1: translate('labelDoctor'), val2: translate('labelPatient') },
      addbtn: false,
      rmvbtn: true
    };
  }

  onInputChange = (e, name, idx, opts = null) => {
    const { value } = e.target;

    this.setState(state => (
      { ...state,
        formGroups: state.formGroups.map((group, i) => {
          if (idx !== i) return group;
          return { ...group,
            fields: group.fields.map((field) => {
              if (field.name === name) return { ...field, value, opts: opts || field.opts };
              return field;
            }) };
        }) }
    ));
  }

  onChangeRadio = (e) => {
    const { value } = e.target;
    this.setState(state => ({
      rfield: { ...state.rfield, value }
    }));
  }

  onSelectChange = (e) => {
    const { value } = e.target;
    this.setState(prevState => ({ diagnosis: { ...prevState.diagnosis, value } }));
  }

  addGroup = () => {
    if (this.state.formGroups.length === 4) this.setState({ addbtn: true });
    this.setState(prevState => ({
      formGroups: prevState.formGroups.concat(newFormGroup(prevState.formGroups.length))
    }), this.setState({ rmvbtn: false }));
  }

  removeGroup = () => {
    if (this.state.formGroups.length === 2) this.setState({ rmvbtn: true });
    const ar = this.state.formGroups.splice(-1, 1);
    this.setState(prevState => ({
      formGroups: prevState.formGroups, ar
    }), this.setState({ addbtn: false }));
  }

  onSubmit = () => {
    const checkIfAnyErrors = () => {
      // Continue to submit if there are no errors
      if (!(this.state.formGroups.some(group => group.fields.some(field => !!field.opts.invalid))) && !(this.state.diagnosis.opts.invalid)) {
        this.props.onSubmit(this.state);
      }
    };

    // Trigger all validations
    this.setState((prevState) => {
      const fg = prevState.formGroups.map(group => ({ ...group,
        fields: group.fields.map(field => ({ ...field, opts: { dirty: true, invalid: field.rules(field.value, group, prevState.formGroups) } })) }));
      return { ...prevState,
        formGroups: fg,
        diagnosis: { ...prevState.diagnosis, opts: { dirty: true, invalid: prevState.diagnosis.rules(prevState.diagnosis.value) } } };
    }, checkIfAnyErrors);
  }

  render() {
    return ([
      <form autoComplete="off" id="form" key="formkey">
        <div className="form-wrapper">
          <div className="form-content">
            {this.state.formGroups.map((group, i) => (
              <FormGroup key={`form-group-${group.stimulation + 1}`} title={`${translate('stimulation')} ${i + 1}`}>
                <Info />
                {group.fields.map(field => (
                  <Input key={`${field.name}-${group.stimulation}`} {...field} idx={i} onChange={this.onInputChange} group={group} formState={this.state.formGroups} />
                ))}
              </FormGroup>
            ))}
          </div>
          <CtrlBtns disadd={this.state.addbtn} disrmv={this.state.rmvbtn} addGroup={this.addGroup} removeGroup={this.removeGroup} />
        </div>
        <div style={{ clear: 'both' }} />
        <div className="form-footer">
          <Diagnosis {...this.state.diagnosis} onChange={this.onSelectChange} />
          <Radio {...this.state.rfield} onChange={this.onChangeRadio} className="form-footer-field radio-btns" />
          <div className="submit-wrapper">
            <Button type="button" onClick={this.onSubmit} value={translate('btnSubmit')} />
          </div>
        </div>
      </form>,
      <PrintView key="printview" formState={this.state} />
    ]);
  }
}

export default Form;
