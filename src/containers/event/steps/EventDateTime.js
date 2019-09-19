import React from 'react';
import widgets from "../../../schemaform/widgets";
import CustomFieldTemplate from "../../../schemaform/customFieldTemplate";

import Form from "react-jsonschema-form";
import eventDateTimeSchema from "./schemas/eventDateTimeSchema";
import eventDateTimeUISchema from "./schemas/eventDateTimeUISchema";

export default function EventDateTime(props) {

  const handleSubmit = ({formData}) => {
    debugger;
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
        //formContext={this.state.doc}
        schema={eventDateTimeSchema()}
        //formData={ doc }
        uiSchema={eventDateTimeUISchema()}
        //validate={this.props.validate}
        //onChange={docChangeDebounced}
        onSubmit={handleSubmit}
        widgets={widgets}
        FieldTemplate={CustomFieldTemplate}
      />
    </div>
  );
}

//export default EventDateTime;