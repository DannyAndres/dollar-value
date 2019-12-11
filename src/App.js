import React from 'react';
import Summary from './components/Summary';
import Button from './components/Button';
import Input from './components/Input';

import './sass/App.scss';

export default () => {

  const load = () => {
    console.log('test')
  }

  return (
    <div className="App">
      <div className="container test">
        <Summary
        
        />
        <div className="box test">
          Grafico
        </div>
      </div>
      <div className="container test">
        <div className="box">
          <Input
            placeholder="Fecha Inicio"
          />
          <Input
            placeholder="Fecha Termino"
          />
          <Button
            text="Mostrar Valor"
            onClick={() => {load()}}
          />
        </div>
      </div>
    </div>
  );
}
