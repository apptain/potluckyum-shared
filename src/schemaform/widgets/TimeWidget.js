import React from "react";
import PropTypes from "prop-types";
import TimePicker from 'react-time-picker';

function TimeWidget(props) {
  const {
    onChange,
    registry: {
      widgets: { BaseInput },
    },
  } = props;
  return (
    <TimePicker
      amPmAriaLabel="Select AM/PM"
      clearAriaLabel="Clear value"
      clockAriaLabel="Toggle clock"
      hourAriaLabel="Hour"
      maxDetail="second"
      minuteAriaLabel="Minute"
      nativeInputAriaLabel="Time"
      secondAriaLabel="Second"
      {...props}
      onChange={value => onChange(value || undefined)}
    />
  );
}

if (process.env.NODE_ENV !== "production") {
  TimeWidget.propTypes = {
    value: PropTypes.string,
  };
}

export default TimeWidget;