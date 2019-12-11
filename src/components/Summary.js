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
          779.10
        </div>
        <div className="icon">
          <Arrowup className="image"/>
          <span className="text">clp</span>
        </div>
      </div>
      <div className="maxmin">
        <div>
          min 613.50
        </div>
        <div>
          max 821.04
        </div>
      </div>
    </div>
  );
  }
