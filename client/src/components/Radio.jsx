import React from 'react';

const Radio = props => (
  <div onChange={e => props.onChange(e)} className={props.className}>
    <label htmlFor="rBtns" className="radiolabel">{props.label}</label>
    <div id="rBtns" className="rbtns">
      <div className="rbtn-wrapper rbtn-left">
        <input type={props.type} value={props.val1} name={props.name} id="rbtn1" />
        <label htmlFor="rbtn1">{props.val1}</label>
      </div>
      <div className="rbtn-wrapper rbtn-right">
        <input type={props.type} value={props.val2} name={props.name} id="rbtn2" />
        <label htmlFor="rbtn2">{props.val2}</label>
      </div>
    </div>
  </div>
);


export default Radio;
