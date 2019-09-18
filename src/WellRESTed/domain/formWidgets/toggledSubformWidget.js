import React, {Component, PropTypes} from "react";
import {Modal} from 'react-bootstrap'
import {asNumber} from "../../utils";

function processValue({type, items}, value) {
    if (type === "array" && items && ["number", "integer"].includes(items.type)) {
        return value.map(asNumber);
    } else if (type === "boolean") {
        return value === "true";
    } else if (type === "number") {
        return asNumber(value);
    }
    return value;
}

class ToggledSubformWidget extends Component {
    state = {
      show: false
    }
    render() {
        let close = () => this.setState({show: false})
        const display = this.props.children.props.formData.display
        return (
            <div className="modal-field toggled-subform">
                <div className="modal-container" style={{height: 100}}>
                    <label>{this.props.label}</label>
                    {display ? <label>:{display}</label> : ''}
                    <span id={this.props.id + '_toggle'} onClick={() => this.setState({show: true})}>Edit</span>
                    <Modal
                        show={this.state.show}
                        onHide={close}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            { this.props.children }
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

ToggledSubformWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
    // ToggledSubformWidget.propTypes = {
    //     schema: PropTypes.object.isRequired,
    //     id: PropTypes.string.isRequired,
    //     value: PropTypes.any,
    //     required: PropTypes.bool,
    //     multiple: PropTypes.bool,
    //     autofocus: PropTypes.bool,
    //     onChange: PropTypes.func,
    //     component: PropTypes.func,
    //     formToDoc: PropTypes.func,
    //     docToForm: PropTypes.func
    // };
}

export default ToggledSubformWidget;
