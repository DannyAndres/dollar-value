import React from 'react';
import Logo from './Logo.js';
import Arrowup from './arrowup.js';
import Arrowdown from './arrowdown.js';
import './../sass/components/Summary.scss';

export default (props) => {
  return (
    <div className="Summary">
      <Logo className="App-logo"/>
      <div className="prom">
        <div className="ammount">
          { props.average }
        </div>
        <div className="icon">
          { props.up ?
            <Arrowup className="image"/> :
            <Arrowdown className="image"/>
          }
          <span className="text">clp</span>
        </div>
      </div>
      <div className="maxmin">
        <div>
          min { props.min }
        </div>
        <div>
          max { props.max }
        </div>
      </div>
    </div>
  );
  }
