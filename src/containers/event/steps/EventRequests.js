import React from 'react';
import formWidgets from "../../../schemaform/widgets";
import CustomFieldTemplate from "../../../schemaform/customFieldTemplate";

import Form from "react-jsonschema-form";
import eventRequestsSchema from "./schemas/eventRequestsSchema";
import eventRequestsUISchema from "./schemas/eventRequestsUISchema";

export default function EventRequests(props) {
  return (
    <div>
      <Form
        safeRenderCompletion={true}
        schema={eventRequestsSchema()}
        uiSchema={eventRequestsUISchema()}
        formData={ props.selectedEvent }
        onChange={props.selectedEventChange}
        //onSubmit={handleSubmit}
        widgets={formWidgets}
        FieldTemplate={CustomFieldTemplate}
      >
        <div>
          {/*empty div hides submit button in rsjf*/}
        </div>
      </Form>
    </div>
  );
}

//export default EventRequests;