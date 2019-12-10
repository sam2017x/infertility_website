import React from 'react';

const FormGroup = props => (
  <div className={props.className || 'form-group'}>
    <h2 className="form-group-title">{props.title}</h2>
    <div className="form-group-content">
      {props.children}
    </div>
  </div>
);

export default FormGroup;
