import React from 'react';

const Input = ({ name, label, type, value, onChange, idx = null, opts: { dirty, invalid }, onBlur, rules, group, formState }) => (
  <div className={`form-field ${dirty && invalid ? 'field-invalid' : ''}`}>
    <label htmlFor={name} id={`${name}-label`}>{label}</label>
    <div className="input-wrapper">
      <input
        autoComplete="off"
        maxLength="120"
        type={type}
        id={name}
        value={value || ''}
        onChange={e => onChange(e, name, idx)}
        onBlur={e => onBlur(e, onChange, name, idx, rules, group, formState)}
      />
      { dirty && invalid
        && <span className="field-validation-message">{invalid}</span>
      }
    </div>
  </div>
);


export default Input;
