import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-table";
import * as BS from "react-bootstrap";
import FormProvider from "./table/FormProvider";
import SendCell from "./table/SendCell";
import HighlightCell from "./table/HighlightCell";
import GridFilters from "./table/GridFilters";
import Form from "react-jsonschema-form";
import formWidgets from "../../schemaform/widgets";
import CustomFieldTemplate from "../../schemaform/customFieldTemplate";
import { TextField, RadioButton, RadioButtonGroup, Checkbox, SelectField, MenuItem }  from 'material-ui';
import { MdDone, MdPersonAdd, MdCancel } from 'react-icons/md';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { useMachine } from '@xstate/react';

import { EVENTS_GET_REQUEST, getUserEvents } from '../../store/events';
import ActionButtonCell from './table/ActionButtonCell';

export default function(props) {
  const [editing, setEditing] = useState(null);
  const eventsState = useSelector(state => { return state.events});

  const dispatch = useDispatch();
  useEffect(() => {

    getUserEvents(dispatch);
  });

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

  const columns = [
    { Header: "Name",  accessor: "name", filterable: true, maxWidth: 220 },
    { Header: "Date", accessor: "date",  filterable: false },
    {
      Header: "",
      maxWidth: 90,
      filterable: false,
      getProps: getActionProps,
      Cell: ActionButtonCell
    }
  ];

  debugger;

  return (
    <React.Fragment>
      <Table
        columns={columns}
        data={eventsState.eventsList}
        showPagination={false}
      />
    </React.Fragment>
  );
}
