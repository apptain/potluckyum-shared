import React from "react";

import { MdDone } from 'react-icons/md';

export default function SendCell(props) {
  const { onClick } = props.columnProps.rest.actions;
  debugger;
  return (
    <React.Fragment>
      <MdDone type="submit" onClick={() => {debugger; onClick(props.original)}}>
        Send
      </MdDone>
    </React.Fragment>
  )
}
