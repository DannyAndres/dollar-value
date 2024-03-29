import React from 'react';
import './../sass/components/Input.scss';

export default (props) => {
  return (
    <input
      placeholder={props.placeholder}
      onClick={() => props.onClick()}
      className="Input"
      defaultValue={props.value}
      readOnly="readonly"
    />
  );
}
