import React from 'react';
import formWidgets from "../../../schemaform/widgets";
import CustomFieldTemplate from "../../../schemaform/customFieldTemplate";

import Form from "react-jsonschema-form";
import eventDescriptionSchema from "./schemas/eventDescriptionSchema";
import eventDescriptionUISchema from "./schemas/eventDescriptionUISchema";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function EventDescription(props) {

  return (
    <Grid>
      <Form
        safeRenderCompletion={true}
        schema={eventDescriptionSchema()}
        // formData={props.selectedEvent}
        // onChange={props.selectedEventChange}
        uiSchema={eventDescriptionUISchema()}
        //onSubmit={handleSubmit}
        widgets={formWidgets}
        // FieldTemplate={CustomFieldTemplate}
      >
        <div>
          {/*empty div hides submit button in rsjf*/}
        </div>
      </Form>
    </Grid>
  );
}