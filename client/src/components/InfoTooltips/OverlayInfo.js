import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const OverlayInfo = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div>
      <p>Velg prosjekt: <span style={{textDecoration: "underline", color:"blue"}} href="#" id="Prosjekt">(info)</span></p>
      <Tooltip placement="top" isOpen={tooltipOpen} target="Prosjekt" toggle={toggle}>
        Velg prosjekt du vil sortere bildefilene for
      </Tooltip>
    </div>
  );
}

export default OverlayInfo;