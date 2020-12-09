import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const DateTooltip = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>Sorter på dato (fra-til): <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">(info)</span></p>
      <Tooltip placement="top" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
        Velg et datointervall du ønsker å sortere bildene i. Mer info kommer
      </Tooltip>
    </div>
  );
}

export default DateTooltip;