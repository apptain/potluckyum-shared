import React from 'react';
import Grid from "@material-ui/core/Grid";
import Form from "react-jsonschema-form";
import eventSchema from "../containers/event/steps/schemas/eventSchema";
import formWidgets from "./widgets";
import CustomFieldTemplate from "./CustomFieldTemplate";
import {useSelector} from "react-redux";

export default function CustomObjectField(props) {
  debugger;
  const wizardState = useSelector(state => {  return state.wizards})


  const FullForm = (schema, uiSchema) => {
    return (
        <Form
          safeRenderCompletion={true}
          schema={schema}
          // formData={selectedEvent}
          //onChange={selectedEventChange}
          //uiSchema={uiSchema}
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

  const renderPropertiesSwitch = () => {
    console.log(arguments);
    console.log(arguments.Arguments);
    console.log(arguments[0]);
    const propertiesToScan = arguments[0];
    debugger;
    let index = 0;
    // if(typeof(propertiesToScan) === 'array'){
           if(propertiesToScan[index]) {
        if(propertiesToScan[index].content.props.schema) {
          index = Object.getOwnPropertyNames(propertiesToScan).findIndex(p => p == wizardState.EventWizard.currentStep);

          debugger;
          return renderPropertiesSwitch(propertiesToScan[index].content.props.schema.properties);
        }
      }
    // }

    try {
      return Object.values(propertiesToScan).map(element => renderContent(element));
    } catch (e) {
      debugger;
    }
  };

  const renderContent = (element) => {
    debugger;
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

  return (
    <div>
      {props.title}
      {props.description}
      {renderPropertiesSwitch(props.properties)}
    </div>
  );
}