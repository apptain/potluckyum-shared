import React from 'react';
import formWidgets from "../../../schemaform/widgets";
import CustomFieldTemplate from "../../../schemaform/customFieldTemplate";

import Form from "react-jsonschema-form";
import eventDescriptionSchema from "./schemas/eventDescriptionSchema";
import eventDescriptionUISchema from "./schemas/eventDescriptionUISchema";

export default function EventDescription(props) {

  const handleSubmit = ({formData}) => {
    debugger;
    const event = Object.assign(props.event, formData);
    props.eventUpdate(event);
    //props.jumpToStep(1);

    // this.setState({ isLoading: true });
    //
    // try {
    //   await this.createEvent({
    //     content: this.state.content
    //   });
    //   this.props.history.push("/");
    // } catch (e) {
    //   alert(e);
    //   this.setState({ isLoading: false });
    // }
  }

  debugger;
  return (
    <div>
      <Form
        safeRenderCompletion={true}
        schema={eventDescriptionSchema()}
        formData={ props.event }
        onChange={props.onChange}
        uiSchema={eventDescriptionUISchema()}
        onSubmit={handleSubmit}
        widgets={formWidgets}
        FieldTemplate={CustomFieldTemplate}
      />
    </div>
  );
}

//export default EventDescription;