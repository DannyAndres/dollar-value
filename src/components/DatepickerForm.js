import React from 'react';
import moment from 'moment';
import './../sass/Datepicker.scss';

export default (props) => {
    const months = moment.months();
    const years = [];
    for (let i = props.fromMonth.getFullYear(); i <= props.toMonth.getFullYear(); i += 1) {
      years.push(i);
    }
  
    const handleChange = (e) => {
      const { year, month } = e.target.form;
      props.onChange(new Date(year.value, month.value));
    };
  
    return (
      <form className="DayPicker-Caption">
        <select className="DayPickerSelect" name="month" onChange={handleChange} value={props.date.getMonth()}>
          {months.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </select>
        <select className="DayPickerSelect" name="year" onChange={handleChange} value={props.date.getFullYear()}>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </form>
    );
  }