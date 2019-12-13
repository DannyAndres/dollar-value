import React, { useState, useEffect } from 'react';
import Trend from 'react-trend';
import DayPicker from 'react-day-picker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';
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
  const [startDateBool, setStartDateBool] = useState(false)
  const [endDateBool, setEndDateBool] = useState(false)
  const [startDate, setStartDate] = useState({format: '', moment: '', day: ''})
  const [endDate, setEndDate] = useState({format: '', moment: '', day: ''})

  const load = async () => {
    setError(false)
    showDatepicker('close')
    if(startDate.format === '' || endDate.format === '') {
      alert('date missing')
      return
    }
    let response = await Http(
      'dolar/periodo/'+startDate.moment.year()+'/'+(startDate.moment.month()+1)+'/dias_i/'+startDate.moment.date()+'/'+endDate.moment.year()+'/'+(endDate.moment.month()+1)+'/dias_f/'+endDate.moment.date(),
    )
    if(response === 'cors' || response.CodigoError !== undefined) {
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
    if(response === 'cors' || response.CodigoError !== undefined) {
      setError(true)
      setAverage('-')
      setMax('-')
      setMin('-')
      setPeriod([0,0])
    } else {
      setAverage(response.Dolares[0].Valor)
    }
  }

  const showDatepicker = datepicker => {
    if(datepicker === 'start') {
      setStartDateBool(true)
      setEndDateBool(false)
    }
    if(datepicker === 'end') {
      setStartDateBool(false)
      setEndDateBool(true)
    }
    if(datepicker === 'close') {
      setStartDateBool(false)
      setEndDateBool(false)
    }
  }

  const selectStartDate = (day, { selected, disabled }) => {
    if(!disabled) {
      setStartDate({
        format: moment(day).format('DD/MM/YYYY'),
        moment: moment(day),
        day: day
      })
      setStartDateBool(false)
    }
  }

  const selectEndDate = (day, { selected, disabled }) => {
    if(!disabled) {
      setEndDate({
        format: moment(day).format('DD/MM/YYYY'),
        moment: moment(day),
        day: day
      })
      setEndDateBool(false)
    }
  }

  const Graph = () => (
    <Trend
      smooth
      autoDraw
      autoDrawDuration={1000}
      autoDrawEasing="ease-out"
      data={period}
      gradient={['white', 'white', 'white']}
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
              <span className="title">Ups, No hay Datos</span>
              <span className="subtitle">Inténtalo nuevamente</span>
            </span>
          }
        </div>
      </div>
      <div className="container">
        <div className="box">
          { startDateBool ?
            <DayPicker
              onDayClick={(day, { selected, disabled }) => selectStartDate(day, { selected, disabled })}
              disabledDays={{
                after: (endDate.moment === '' ? '' : endDate.moment.clone().subtract(1,'day').toDate())
              }}
            />
          : '' }
          { endDateBool ?
            <DayPicker
              onDayClick={(day, { selected, disabled }) => selectEndDate(day, { selected, disabled })}
              disabledDays={{
                before: (startDate.moment === '' ? '' : startDate.moment.clone().add(1,'day').toDate())
              }}
            />
          : '' }
          <Input
            placeholder="Fecha Inicio"
            onClick={() => showDatepicker('start')}
            value={startDate.format}
          />
          <Input
            placeholder="Fecha Termino"
            onClick={() => showDatepicker('end')}
            value={endDate.format}
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
