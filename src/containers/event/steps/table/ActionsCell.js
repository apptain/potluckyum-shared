import React from "react";

import { MdDone, MdPersonAdd, MdCancel } from 'react-icons/md';

const editModes = {
  view: props => (
    <MdDone onClick={props.onEdit}>
      Edit
    </MdDone>
  ),
  edit: props => (
    <React.Fragment>
      <MdDone type="submit">
        Save
      </MdDone>

      <MdDone onClick={props.onCancel}>
        Cancel
      </MdDone>
    </React.Fragment>
  )
};

export default function ActionsCell(props) {
  const {
    mode,
    actions: { onEdit, onCancel }
  } = props.columnProps.rest;
  const MdDones = editModes[mode];
  return <MdDones onEdit={() => onEdit(props.index)} onCancel={onCancel} />;
}
