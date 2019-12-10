import translate from '../localization/i18n';

const onBlur = (e, change, name, idx, rules, group, formState) => {
  e.preventDefault();
  const { value } = e.target;
  change(e, name, idx, { dirty: true, invalid: rules(value, group, formState) });
};

const validationProps = {
  opts: {
    dirty: false,
    invalid: null
  },
  onBlur
};

const checkCleaving = (val, group) => {
  const ooc = group.fields.find(field => field.name === 'oocytes').value;
  if (!ooc) return false;
  return parseInt(ooc, 10) < parseInt(val, 10);
};

const checkTop = (val, group) => {
  const clv = group.fields.find(field => field.name === 'cleaving').value;
  if (!clv) return false;
  return parseInt(clv, 10) < parseInt(val, 10);
};

const checkTop2 = (val, group) => {
  const ooc = group.fields.find(field => field.name === 'oocytes').value;
  if (!ooc) return false;
  return parseInt(ooc, 10) < parseInt(val, 10);
};

const checkOocytes = (val, group) => {
  const clv = group.fields.find(field => field.name === 'cleaving').value;
  if (!clv) return false;
  return parseInt(clv, 10) > parseInt(val, 10);
};

const checkOocytes2 = (val, group) => {
  const top = group.fields.find(field => field.name === 'top').value;
  if (!top) return false;
  return parseInt(top, 10) > parseInt(val, 10);
};

const checkAge = (val, group, formState) => {
  if (group.stimulation - 1 < 0) return false;
  const prevAge = formState
    .find(prvGroup => prvGroup.stimulation === (group.stimulation - 1)).fields
    .find(prvGrp => prvGrp.name === 'age').value;
  return parseInt(prevAge, 10) > parseInt(val, 10);
};

const validationRules = {
  age: (val, group, formState) => ((val && Number.isNaN(parseInt(val, 10)) && translate('val_age_1'))
      || (!val && translate('val_age_5')) || (parseInt(val, 10) < 18 && translate('val_age_2'))
      || (parseInt(val, 10) > 47 && translate('val_age_3'))
      || (val && checkAge(val, group, formState) && translate('val_age_4'))),
  dose: val => ((val && Number.isNaN(parseInt(val, 10)) && translate('val_dose_1'))
      || (!val && translate('val_dose_2'))),
  oocyte: (val, group) => ((!val) && translate('val_ooc_1'))
      || ((val && Number.isNaN(parseInt(val, 10)) && translate('val_ooc_2')))
      || (val && checkOocytes(val, group) && translate('val_ooc_3'))
      || (val && checkOocytes2(val, group) && translate('val_ooc_4')),
  cleaving: (val, group) => ((!val) && translate('val_clv_1'))
      || ((val && Number.isNaN(parseInt(val, 10)) && translate('val_clv_2')))
      || (val && checkCleaving(val, group) && translate('val_clv_3')),
  top: (val, group) => ((!val) && translate('val_top_1'))
      || ((val && Number.isNaN(parseInt(val, 10)) && translate('val_top_2')))
      || (val && checkTop(val, group) && translate('val_top_3'))
      || (val && checkTop2(val, group) && translate('val_top_4')),
  diagnosis: val => (Number.isNaN(parseInt(val, 10)) && translate('val_diag_1'))

};

const setValidation = input => ({ ...validationProps, rules: validationRules[input] });

export default setValidation;
