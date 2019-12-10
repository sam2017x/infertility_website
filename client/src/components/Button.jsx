import React from 'react';

const Button = props => (
  <div className={props.className}>
    <input type={props.type} hidden={props.hidden} id={props.id} onClick={props.onClick} value={props.value} disabled={props.disabled} />
  </div>
);

export default Button;
