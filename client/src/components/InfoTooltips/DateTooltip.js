import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const DateTooltip = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>Sorter på dato (fra-til): <span style={{textDecoration: "underline", color:"blue"}} href="#" id="Date">(info)</span></p>
      <Tooltip placement="top" isOpen={tooltipOpen} target="Date" toggle={toggle}>
        Velg et datointervall du ønsker å sortere bildefilene på
      </Tooltip>
    </div>
  );
}

export default DateTooltip;