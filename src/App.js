import React, { useState, useEffect } from 'react';
import Trend from 'react-trend';
import Http from './config/Fetch';
import Summary from './components/Summary';
import Button from './components/Button';
import Input from './components/Input';

import './sass/App.scss';

export default () => {
  const [average, setAverage] = useState(0)
  const [min, setMin] = useState('-')
  const [max, setMax] = useState('-')
  const [up, setUp] = useState(true)
  const [period, setPeriod] = useState([0,0])
  const [error, setError] = useState(false)

  const load = async () => {
    setError(false)
    let response = await Http('dolar/periodo/2010/01/dias_i/04/2018/01/dias_f/07')
    if(response === 'cors') {
      setError(true)
      setAverage('-')
      setMax('-')
      setMin('-')
      setPeriod([0,0])
    } else {
      response.Dolares = response.Dolares.map(e => parseFloat(e.Valor.replace(",", ".")))
      let max = 0
      let min = response.Dolares[0]
      let count = 0
      response.Dolares.forEach(e => {
        max = max < e ? e : max;
        min = min > e ? e : min;
        count += e
      });
      count = count / response.Dolares.length
      if(response.Dolares.length > 1) {
        setPeriod(response.Dolares)
        setUp(response.Dolares[0] > response.Dolares[response.Dolares.length - 1] ? false : true)
      } else {
        setPeriod([0,0])
        setUp(true)
      }
      setAverage(count.toFixed(2))
      setMax(max)
      setMin(min)
    }
  }

  const dollarValue = async () => {
    const response = await Http('dolar')
    if(response === 'cors') {
      setError(true)
      setAverage('-')
      setMax('-')
      setMin('-')
      setPeriod([0,0])
    } else {
      setAverage(response.Dolares[0].Valor)
    }
  }

  const Graph = () => (
    <Trend
      smooth
      autoDraw
      autoDrawDuration={1000}
      autoDrawEasing="ease-out"
      data={period}
      gradient={[period.length > 2 ? '#EF5350' : 'white', 'white', 'white']}
      radius={10}
      height={100}
      width={270}
      strokeWidth={5}
      strokeLinecap={'round'}
    />
  );

  useEffect(() => {
    dollarValue();
  },[])

  return (
    <div className="App">
      <div className="container">
        <Summary
          average={average}
          min={min}
          max={max}
          up={up}
        />
        <div className="box">
          { !error ? <Graph/> :
            <span className="ups">
              <span className="title">Ups</span>
              <span className="subtitle">Inténtalo nuevamente</span>
            </span>
          }
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
