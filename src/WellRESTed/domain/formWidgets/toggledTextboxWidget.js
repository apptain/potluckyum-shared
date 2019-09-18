import React, {Component, PropTypes} from "react";
import {Button, Modal} from 'react-bootstrap'
import BaseInput from './BaseInput'

class ToggledTextboxWidget extends Component {

    getInitialState() {
        return {show: false};
    }
    componentWillReceiveProps(){
    }
    render() {
        let close = () => this.setState({show: false})
        const {enumOptions} = this.props.options;
        const selected = _.find(enumOptions, (option) => {
            return option.value == this.props.value
        })
        var value
        if(this.props.value){
            if(this.props.value.length > 35){
                value = this.props.value.substr(0, 32) + '...'
            } else {
                value = this.props.value
            }
        }
        return (
            <div className="modal-field toggled-textbox">
                <div className="modal-container" style={{height: 100}}>
                    <label>
                        { this.props.label}
                    </label>:
                    <label id={this.props.id + '_value'}>
                        {value}
                    </label>
                    {selected ? <label>:{selected.label}</label> : ''}
                    <span className="pnnl-icon-edit" id={this.props.id + '_toggle'} onClick={() => this.setState({show: true})}></span>
                    <Modal
                        show={this.state.show}
                        onHide={close}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <label>{this.props.label}{this.props.required ? "*" : null}</label>
                            <BaseInput {...this.props}/>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

ToggledTextboxWidget.defaultProps = {
    autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
    // ToggledTextboxWidget.propTypes = {
    //     schema: PropTypes.object.isRequired,
    //     id: PropTypes.string.isRequired,
    //     // options: PropTypes.shape({
    //     //     enumOptions: PropTypes.array,
    //     // }).isRequired,
    //     value: PropTypes.any,
    //     required: PropTypes.bool,
    //     multiple: PropTypes.bool,
    //     autofocus: PropTypes.bool,
    //     onChange: PropTypes.func,
    // };
}

export default ToggledTextboxWidget;
