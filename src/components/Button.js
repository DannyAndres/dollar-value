import React from 'react';
import './../sass/components/Button.scss';

export default (props) => {
  return (
    <div onClick={() => {props.onClick()}} className="Button">
      { props.text }
    </div>
  );
}
