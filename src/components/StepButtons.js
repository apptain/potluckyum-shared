import React from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";

const StepButtons = (props) => {
  debugger;
  return (
    <div className={props.classes.flexBar}>
      {props.selectedIndex > 0 &&
        <Button
          onClick={props.handleBack}
          className={props.classes.backButton}
          size='large'
        >
          Back
        </Button>
      }
      <Button
        variant="contained"
        color="primary"
        size='large'
      >
        Next
      </Button>
      <Button
        variant="contained"
        color="primary"
        size='large'
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="primary"
        size='large'
      >
        Review and Create or Update
      </Button>
      <Button
        variant="contained"
        color="primary"
        size='large'
      >
        Review and Create or Update
      </Button>
      <Button
        variant="contained"
        color="primary"
        size='large'
      >
        Review and Create or Update
      </Button>
    </div>
  );
}

StepButtons.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  back: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  review: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired
};

export default StepButtons;