import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const AreaTooltip = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>Sorter på område i valgt prosjekt: <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">(info)</span></p>
      <Tooltip placement="top" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
        Info kommer
      </Tooltip>
    </div>
  );
}

export default AreaTooltip;