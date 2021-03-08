import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { formatISO } from 'date-fns'

const Datepicker = (props) => {
  const [value, onChange] = useState([new Date(), new Date()]);

  console.log(value);

  const getDataFromDate = () => {
    let resultISO = [];
    resultISO = formatISO(value[0]);
    resultISO = formatISO(value[1]);

    console.log(resultISO);

    /*
    getDateRange(value)
      .then(props.images);*/
  }

  return (
    <div>
      <DateRangePicker
        onChange={onChange}
        value={value}
        locale
        onCalendarClose={getDataFromDate()}
      />
    </div>
  );
};

export default Datepicker;
