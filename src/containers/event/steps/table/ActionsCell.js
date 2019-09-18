import React from "react";
import Button from 'muicss/lib/react/button';

const editModes = {
  view: props => (
    <Button onClick={props.onEdit}>
      Edit
    </Button>
  ),
  edit: props => (
    <React.Fragment>
      <Button type="submit">
        Save
      </Button>

      <Button onClick={props.onCancel}>
        Cancel
      </Button>
    </React.Fragment>
  )
};

export default function ActionsCell(props) {
  const {
    mode,
    actions: { onEdit, onCancel }
  } = props.columnProps.rest;
  const Buttons = editModes[mode];
  return <Buttons onEdit={() => onEdit(props.index)} onCancel={onCancel} />;
}
