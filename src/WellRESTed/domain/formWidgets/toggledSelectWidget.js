import React, {Component, PropTypes} from "react";
import {Button, Modal} from 'react-bootstrap'
import {asNumber} from "../../utils";


/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
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

class ToggledSelectWidget extends Component {
    getInitialState() {
        return {show: false};
    }
    render() {
        let close = () => this.setState({show: false})
        const {enumOptions} = this.props.options;
        const selected = _.find(enumOptions, (option) => {
            return option.value == this.props.value
        })
        return (
            <div className="modal-field toggled-select">
                <div className="modal-container" style={{height: 100}}>
                    <label>{ this.props.label}</label>
                    {selected ? <label>:{selected.label}</label> : ''}
                    <span className="pnnl-icon-edit" onClick={() => this.setState({show: true})}></span>
                    <Modal
                        show={this.state.show}
                        onHide={    close}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <label>{this.props.label}{this.props.required ? "*" : null}</label>
                            <select
                                id={this.props.id}
                                multiple={this.props.multiple}
                                className="form-control"
                                value={this.props.value}
                                required={this.props.required}
                                disabled={this.props.disabled}
                                readOnly={this.props.readonly}
                                autoFocus={this.props.autofocus}
                                onChange={(event) => {
                                    let newValue;
                                    {/*if (multiple) {*/}
                                        {/*newValue = [].filter.call(*/}
                                            {/*event.target.options, o => o.selected).map(o => o.value);*/}
                                    {/*} else {*/}
                                        newValue = event.target.value;
                                    {/*}*/}
                                    this.props.onChange(processValue(this.props.schema, newValue));
                                }}>{
                                enumOptions.map(({value, label}, i) => {
                                    return <option key={i} value={value}>{label}</option>;
                                })
                            }</select>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

ToggledSelectWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
    // ToggledSelectWidget.propTypes = {
    //     schema: PropTypes.object.isRequired,
    //     id: PropTypes.string.isRequired,
    //     options: PropTypes.shape({
    //         enumOptions: PropTypes.array,
    //     }).isRequired,
    //     value: PropTypes.any,
    //     required: PropTypes.bool,
    //     multiple: PropTypes.bool,
    //     autofocus: PropTypes.bool,
    //     onChange: PropTypes.func,
    // };
}

export default ToggledSelectWidget;
