import React from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";

const StepButtons = (props) => {
  const errorLineItem = (error) => {
    return <li></li>;
  };

  return (
    <div>
        <Button
          onClick={props.previous}
          className={props.classes.backButton}
          size='large'
        >
          Back
        </Button>
      <Button
        variant="contained"
        color="primary"
        size='large'
        onClick={props.next}
      >
        Next
      </Button>
      <Button
        variant="contained"
        color="primary"
        size='large'
        onClick={props.cancel}
      >
        Cancel
      </Button>

      {
        !props.errors.length ?
          <Button
            variant="contained"
            color="primary"
            size='large'
            // onClick={props.upsert}
          >
            Create or Update
          </Button> :
          <Button>
            <label>Errors: </label>

              <div>
                <ul>
                  {
                    props.errors.map(error =>
                      <li>
                        <label>Error</label>
                        <label>{error.property}:</label>
                        <span>{error.message}</span>
                      </li>
                    )
                  }
                </ul>
              </div>

          </Button>
      }
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