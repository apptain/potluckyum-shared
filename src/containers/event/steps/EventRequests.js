import React from 'react';
import formWidgets from "../../../schemaform/widgets";
import CustomFieldTemplate from "../../../WellRESTed/domain/customFieldTemplate";

import Form from "react-jsonschema-form";
import eventRequestsSchema from "./schemas/eventRequestsSchema";
import eventRequestsUISchema from "./schemas/eventRequestsUISchema";

export default function EventRequests(props) {

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
        schema={eventRequestsSchema()}
        //formData={ doc }
        uiSchema={eventRequestsUISchema()}
        //validate={this.props.validate}
        //onChange={docChangeDebounced}
        onSubmit={handleSubmit}
        widgets={formWidgets}
        FieldTemplate={CustomFieldTemplate}
      />
    </div>
  );
}

//export default EventRequests;