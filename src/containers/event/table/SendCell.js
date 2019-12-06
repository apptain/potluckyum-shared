import React from "react";

import { MdDone } from 'react-icons/md';
import { Container, Button, Link } from 'react-floating-action-button';

export default function SendCell(props) {
  const { onClick } = props.columnProps.rest.actions;

  return (
    <React.Fragment>
      <MdDone type="submit" onClick={() => { onClick(props.original)}}>
        Send
      </MdDone>
    </React.Fragment>
  )
}
