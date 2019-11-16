import React from "react";
import PropTypes from "prop-types";
import TimePicker from 'react-time-picker';
import Grid from "@material-ui/core/Grid";
import Form from "react-jsonschema-form";
import formWidgets from "./index";
import CustomFieldTemplate from "../customFieldTemplate";

const SubformWidget = (props) => {

  return (
    <Grid>
      <Form
        safeRenderCompletion={true}
        schema={eventSchema()}
        formData={props.value}
        //onChange={selectedEventChange}
        //uiSchema={eventDescriptionUISchema()}
        //onSubmit={handleSubmit}
        widgets={formWidgets}
        FieldTemplate={CustomFieldTemplate}
      >
        <div>
          {/*empty div hides submit button in rsjf*/}
        </div>
      </Form>
    </Grid>
  )
}


if (process.env.NODE_ENV !== "production") {
  SubformWidget.propTypes = {
    value: PropTypes.string,
  };
}

export default SubformWidget;