import React from "react";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';

function TypographyWidget(props) {
  return (
    <Typography {...props} gutterBottom>
      {props.value}
    </Typography>
  );
}

if (process.env.NODE_ENV !== "production") {
  TypographyWidget.propTypes = {
    value: PropTypes.string,
  };
}

export default TypographyWidget;