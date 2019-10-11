import React from 'react';
import Grid from "@material-ui/core/Grid";
import Form from "react-jsonschema-form";
import eventSchema from "../containers/event/steps/schemas/eventSchema";
import formWidgets from "./widgets";
import CustomFieldTemplate from "./CustomFieldTemplate";

export default function CustomObjectFieldTemplate(props) {

  const FullForm = (schema, uiSchema) => {
    return (
        <Form
          safeRenderCompletion={true}
          schema={schema}
          // formData={selectedEvent}
          //onChange={selectedEventChange}
          uiSchema={uiSchema}
          //onSubmit={handleSubmit}
          widgets={formWidgets}
          FieldTemplate={CustomFieldTemplate}
          //ObjectFieldTemplate={CustomObjectFieldTemplate}
        >
          <div>
            {/*empty div hides submit button in rsjf*/}
          </div>
        </Form>
    );
  }

  const renderPropertiesSwitch = (properties) => {
    debugger;
    if(properties[2]) {
      if(properties[2].content.props.schema) {
        return renderPropertiesSwitch(properties[0].content.props.schema.properties);
      }
    }

    try {
      return Object.values(properties).map(element => renderContent(element));
    } catch (e) {
      debugger;
    }


  };

  const renderContent = (element) => {
    return FullForm(element, props.uiSchema)
  };

  const renderPropertiesContent = (properties) => {
    return properties.map(element => renderPropertiesSwitch(element));
  };

  // const renderSwitch = (props) => {
  //   if(props.schema.type == "object") {
  //     debugger;
  //     return <FullForm {...props} />;
  //   } else {
  //     debugger;
  //   }
  // }
  //
  //
  //
  // properties[1].content.props.schema.properties

  debugger;
  return (
    <div>
      {props.title}
      {props.description}
      {renderPropertiesSwitch(props.properties)}
    </div>
  );
}