import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const OverlayInfo = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>Velg prosjekt: <span style={{textDecoration: "underline", color:"blue"}} href="#" id="TooltipExample">(info)</span></p>
      <Tooltip placement="top" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
        Velg ønsket prosjekt du vil se bildefiler for
      </Tooltip>
    </div>
  );
}

export default OverlayInfo;