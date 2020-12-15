import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const AreaTooltip = (props) => {
  const [toolOpen, setToolOpen] = useState(false);

  const toggle = () => setToolOpen(!toolOpen);

  return (
    <div>
      <p>Sorter på område i valgt prosjekt: <span style={{textDecoration: "underline", color:"blue"}} href="#" id="Tooltip">(info)</span></p>
      <Tooltip placement="top" isOpen={toolOpen} target="Tooltip" toggle={toggle}>
        Velg område du ønsker å sortere på i valgt prosjekt.
      </Tooltip>
    </div>
  );
}

export default AreaTooltip;