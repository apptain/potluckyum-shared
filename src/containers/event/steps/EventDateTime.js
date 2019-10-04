import React from 'react';
import widgets from "../../../schemaform/widgets";
import CustomFieldTemplate from "../../../schemaform/customFieldTemplate";

import Form from "react-jsonschema-form";
import eventDateTimeSchema from "./schemas/eventDateTimeSchema";
import eventDateTimeUISchema from "./schemas/eventDateTimeUISchema";

export default function EventDateTime(props) {

  const handleSubmit = ({formData}) => {
    props.selectedEventUpdate(formData);
    props.jumpToStep(1);
  }

  return (
    <div>
      <Form
        safeRenderCompletion={true}
        formData={ props.selectedEvent }
        onChange={props.selectedEventChange}
        schema={eventDateTimeSchema()}
        uiSchema={eventDateTimeUISchema()}
        //onSubmit={handleSubmit}
        widgets={widgets}
        FieldTemplate={CustomFieldTemplate}
      >
        <div>
          {/*empty div hides submit button in rsjf*/}
        </div>
      </Form>
    </div>
  );
}

//export default EventDateTime;