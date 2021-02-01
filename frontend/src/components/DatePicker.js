import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

export default function Datepicker() {
  const [value, onChange] = useState([new Date(), new Date()]);

  return (
    <div>
      <DateRangePicker
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
