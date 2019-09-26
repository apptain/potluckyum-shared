import React from 'react';
import formWidgets from "../../../schemaform/widgets";
import CustomFieldTemplate from "../../../schemaform/customFieldTemplate";

import Form from "react-jsonschema-form";
import eventLocationSchema from "./schemas/eventLocationSchema";
import eventLocationUISchema from "./schemas/eventLocationUISchema";

export default function EventLocation(props) {

  const handleSubmit = ({formData}) => {
    //event.preventDefault();
    props.eventUpdate(formData);
    props.jumpToStep(1);

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

  return (
    <div>
      <Form
        safeRenderCompletion={true}
        schema={eventLocationSchema()}
        uiSchema={eventLocationUISchema()}
        formData={ props.event }
        onChange={props.onChange}
        onSubmit={handleSubmit}
        widgets={formWidgets}
        FieldTemplate={CustomFieldTemplate}
      />
    </div>
  );
}

//export default EventLocation;