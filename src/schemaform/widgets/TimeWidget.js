import React from 'react';
import PropTypes from "prop-types";
import moment from 'moment';
import TimePicker from 'react-time-picker';

const format = 'h:mm a';

const now = moment()
  .hour(0)
  .minute(0);

function TimeWidget(props) {
  const {
    onChange,
    registry: {
      widgets: { BaseInput },
    },
  } = props;
  return (
    <TimePicker
      showSecond={false}
      defaultValue={now}
      className="xxx"
      format={format}
      use12Hours
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