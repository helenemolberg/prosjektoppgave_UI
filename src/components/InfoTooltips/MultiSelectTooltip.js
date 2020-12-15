import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const MultiSelectTooltip = (props) => {
  const [toolOpen, setToolOpen] = useState(false);

  const toggle = () => setToolOpen(!toolOpen);

  return (
    <div>
      <p>Sorter på kategorier: <span style={{textDecoration: "underline", color:"blue"}} href="#" id="Multi">(info)</span></p>
      <Tooltip placement="top" isOpen={toolOpen} target="Multi" toggle={toggle}>
        Velg kategori/er du ønsker å sortere filene på.
      </Tooltip>
    </div>
  );
}

export default MultiSelectTooltip;