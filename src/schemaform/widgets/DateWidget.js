import React from "react";
import PropTypes from "prop-types";
import DatePicker from 'react-date-picker';

import "react-date-picker/dist/DatePicker.less";

function DateWidget(props) {
  const {
    onChange,
    registry: {
      widgets: { BaseInput },
    },
  } = props;
  return (
    <DatePicker
      calendarAriaLabel="Toggle calendar"
      clearAriaLabel="Clear value"
      dayAriaLabel="Day"
      monthAriaLabel="Month"
      nativeInputAriaLabel="Date"
      yearAriaLabel="Year"
      {...props}
      onChange={value => onChange(value || undefined)}
    />

  );
}

if (process.env.NODE_ENV !== "production") {
  DateWidget.propTypes = {
    value: PropTypes.string,
  };
}

export default DateWidget;