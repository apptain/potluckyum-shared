import React, { Component, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-table";
import * as BS from "react-bootstrap";
import initialData from "./table/dataFactory";
import FormProvider from "./table/FormProvider";
import ActionsCell from "./table/ActionsCell";
import SendCell from "./table/SendCell";
import HighlightCell from "./table/HighlightCell";
import GridFilters from "./table/GridFilters";
import Form from "react-jsonschema-form";
// import eventInvitationSchema from "./schemas/eventInvitationSchema";
// import eventInvitationUISchema from "./schemas/eventInvitationUISchema";
import formWidgets from "../../schemaform/widgets";
import CustomFieldTemplate from "../../schemaform/customFieldTemplate";
import { TextField, RadioButton, RadioButtonGroup, Checkbox, SelectField, MenuItem }  from 'material-ui';
import { MdDone, MdPersonAdd, MdCancel } from 'react-icons/md';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import ActionButtonCell from "./table/ActionButtonCell";

import { useMachine } from '@xstate/react';

import {INVITATION_SEND} from '../../store/events';

export default function(props) {
  const dispatch = useDispatch();

  const {state, send } = props;
  const [editing, setEditing] = useState(null);
  const [eventFormModalIsOpen, eventFormModalToggle ] = useState(false);

  const { selectedEvent } = props;

  const invitationSend = (invitation) => {

    send({
      type: INVITATION_SEND,
      dispatch,
      selectedEvent,
      invitation
    });
  };

  const toggleModal = event => {
    eventFormModalToggle(!eventFormModalIsOpen);
  }

  const editableComponent = ({ input, editing, value, ...rest }) => {
    const Component = editing ? BS.FormControl : BS.FormControl.Static;
    const children =
      (!editing && <HighlightCell value={value} {...rest} />) || undefined;
    return <Component {...input} {...rest} children={children} />;
  };

  const editableColumnProps = {
    ...GridFilters,
    Cell: props => {
      const fieldProps = {
        component: editableComponent,
        editing,
        props
      };

      if(!editing) {
        return <span>{props.value}</span>
      } else {
        return <TextField value={props.value} name={props.column.id} {...fieldProps} />;
      }
    }
  };

  const getActionProps = (gridState, rowProps) =>
    (
      rowProps && {
        mode: editing === rowProps.original ? "edit" : "view",
        actions: {
          onEdit: () => {  setEditing({}); },
          onCancel: () => {   setEditing(null); },
        }
      }) ||
    {};

  const sendInvitationActionProps = (gridState, rowProps) =>
  (
    rowProps && {
      actions: {
        onClick: invitationSend
      }
    }) ||
  {};

  const columns = [
    {
      Header: "",
      maxWidth: 90,
      filterable: false,
      getProps: getActionProps,
      Cell: ActionsCell
    },
    { Header: "Name",  accessor: "name", ...editableColumnProps,filterable: true, maxWidth: 220 },
    { Header: "Message", accessor: "message",  ...editableColumnProps, filterable: false },
    { Header: "Status", accessor: "status",  ...editableColumnProps, filterable: true},
    { Header: "Will Bring", accessor: "willBring",  ...editableColumnProps, filterable: true },
    {
      Header: "",
      maxWidth: 90,
      filterable: false,
      getProps: sendInvitationActionProps,
      Cell: ActionButtonCell
    }
  ];

  const handleSubmit = ({formData}) => {

    const event = props.selectedEvent;
    if(!event.invitations) {
      event.invitations = [];
    }
    let invitations = event.invitations || [];
    invitations = invitations.filter(function(item){
      return !!item;
    });
    //invitations.push(formData);
    // event.invitations = invitations;
    // props.selectedEventUpdate(event);
    //props.jumpToStep(1);
  };

  let invitations = props.selectedEvent.invitations || [];
  invitations = invitations.filter(function(item){
    return !!item;
  });

  const { classes, schema, uiSchema } = props;

  return (
    <React.Fragment>
      <Grid container justify="center">
        <Grid item xs={1}>
          <MdPersonAdd size={64} onClick={toggleModal}></MdPersonAdd>
        </Grid>
        <Grid item xs={11}>
          {eventFormModalIsOpen &&
            <Form
              safeRenderCompletion={true}
              formData={ props.selectedInvitation }
              schema={schema}
              uiSchema={uiSchema}
              onChange={props.onSelectedInvitationChange}
              //onSubmit={handleSubmit}
              widgets={formWidgets}
              FieldTemplate={CustomFieldTemplate}
            >
              <div className={""}>
                <button type="button"><MdCancel/></button>
                <button type="submit" onClick={props.invitationAdd}><MdDone/></button>
              </div>
            </Form>
          }
        </Grid>
      </Grid>

      <FormProvider
        form="inline"
        //onSubmit={handleSubmit}
        //onSubmitSuccess={() => setState({ editing: null })}
        initialValues={editing}
        enableReinitialize
      >
        {formProps => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <Table
                columns={columns}
                data={invitations}
                showPagination={false}
              />
            </form>
          )
        }}
      </FormProvider>
    </React.Fragment>
  );
}
