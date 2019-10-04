import React from 'react';
import formWidgets from "../../../schemaform/widgets";
import CustomFieldTemplate from "../../../schemaform/customFieldTemplate";

import Form from "react-jsonschema-form";
import eventLocationSchema from "./schemas/eventLocationSchema";
import eventLocationUISchema from "./schemas/eventLocationUISchema";

export default function EventLocation(props) {
  return (
    <div>
      <Form
        safeRenderCompletion={true}
        schema={eventLocationSchema()}
        uiSchema={eventLocationUISchema()}
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

//export default EventLocation;