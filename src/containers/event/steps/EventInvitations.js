import React, { Component, useState } from "react";
import set from "lodash/fp/set";
import { Field } from "redux-form";
import Table from "react-table";
import * as BS from "react-bootstrap";
import initialData from "./table/dataFactory";
import FormProvider from "./table/FormProvider";
import { avatarColumnProps } from "./table/AvatarsCell";
import ActionsCell from "./table/ActionsCell";
import HighlightCell from "./table/HighlightCell";
import GridFilters from "./table/GridFilters";
import Form from "react-jsonschema-form";
import eventInvitationSchema from "./schemas/eventInvitationSchema";
import eventInvitationUISchema from "./schemas/eventInvitationUISchema";
import formWidgets from "../../../schemaform/widgets";
import CustomFieldTemplate from "../../../schemaform/customFieldTemplate";
import { TextField, RadioButton, RadioButtonGroup, Checkbox, SelectField, MenuItem }  from 'material-ui';

import { MdDone, MdPersonAdd, MdCancel } from 'react-icons/md';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function(props) {
  const [editing, setEditing] = useState(null);
  const [eventFormModalIsOpen, eventFormModalToggle ] = useState(false);

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
        onEdit: () => { debugger; setEditing({}); },
        onCancel: () => { debugger;  setEditing(null); },
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
    { Header: "Name",  accessor: "inviteeName", ...editableColumnProps,filterable: false, maxWidth: 220 },
    { Header: "Email or Phone", accessor: "phoneNumberOrEmail", ...editableColumnProps, filterable: false, maxWidth: 280 },
    { Header: "Message", accessor: "message",  ...editableColumnProps, filterable: false }
  ];

  const handleSubmit = ({formData}) => {
    debugger;
    const event = props.event;
    if(!event.invitations) {
      event.invitations = [];
    }
    let invitations = event.invitations || [];
    invitations = invitations.filter(function(item){
      return !!item;
    });
    invitations.push(formData);
    event.invitations = invitations;
    props.eventUpdate(event);
    //props.jumpToStep(1);
  };

  let invitations = props.event.invitations || [];
  invitations = invitations.filter(function(item){
    return !!item;
  });

  const { classes } = props;


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
                schema={eventInvitationSchema()}
                //formData={ doc }
                uiSchema={eventInvitationUISchema()}
                //validate={this.props.validate}
                //onChange={docChangeDebounced}
                onSubmit={handleSubmit}
                widgets={formWidgets}
                FieldTemplate={CustomFieldTemplate}
              >
                <div className={""}>
                  <button type="button"><MdCancel/></button>
                  <button type="submit"><MdDone/></button>
                </div>
              </Form>
            }
          </Grid>
        </Grid>

        <FormProvider
          form="inline"
          onSubmit={handleSubmit}
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
