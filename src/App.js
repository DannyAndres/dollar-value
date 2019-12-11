import React from 'react';
import Trend from 'react-trend';
import Summary from './components/Summary';
import Button from './components/Button';
import Input from './components/Input';

import './sass/App.scss';

export default () => {

  const load = () => {
    console.log('test')
  }

  const Graph = () => (
    <Trend
      smooth
      autoDraw
      autoDrawDuration={1000}
      autoDrawEasing="ease-out"
      data={[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0]}
      gradient={['#FFF', '#FFF', '#fff']}
      radius={10}
      height={100}
      strokeWidth={5}
      strokeLinecap={'butt'}
    />
  );

  return (
    <div className="App">
      <div className="container">
        <Summary
        
        />
        <div className="box">
          <Graph/>
        </div>
      </div>
      <div className="container">
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
