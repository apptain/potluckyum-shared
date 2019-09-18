import React, { Component, useState} from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'debounce';
import $ from 'jquery';

import Form from 'react-jsonschema-form';
import formWidgets from '../domain/formWidgets';
import CustomFieldTemplate from '../domain/customFieldTemplate';
// import {fetchDoc, createDoc, updateDoc} from '../../services/apiCalls';
import {docChange, docInitiate, viewGetFetch} from '../redux/modules/domainModule';
import { Action, withStateMachine } from 'react-automata'
import machine from '../machines/docFormStateMachine';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

//TODO dup code move to utils
function debounceEventHandler(...args) {
  const debounced = debounce(...args)
  return function (e) {
    return debounced(e)
  }
}

class DocFormContainer extends Component {
  static propTypes = {
    schemaName: PropTypes.string,
    schemaFunc: PropTypes.func,
    uiSchema: PropTypes.func,
    validate: PropTypes.func,
    keyField: PropTypes.string,
    defaultDoc: PropTypes.object,
    formToDomainDoc: PropTypes.func,
    domainToFormDoc: PropTypes.func,
    getDocViewFetch: PropTypes.func,
    getDocViewCreateCall: PropTypes.func,
    getDocViewUpdateCall: PropTypes.func,
    onDocChange: PropTypes.func,
    docId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  constructor(props) {
    super(props);
    this.state = {
      docId: null
    };
  }

  static get defaultProps() {
    return {
      views: []
    };
  }
  state = {
    doc: null
  }
  causeSubmit(){
    $('[type=submit]').click()
  }
  componentDidMount(){
    //disable enter key submit
    $(document).ready(function() {
      $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
          return false;
        }
      });
    });
  }
  docSave(form){
    const doc = form.formData;
    const id = form.formData[this.props.keyField];
    // if(id){
    //     this.props.docUpdateFetch(this.props.schemaName, updateDoc, doc, id, this.props.formToDomainDoc, this.props.domainToFormDoc, this.props.keyField)
    // } else {
    //     this.props.docCreateFetch(this.props.schemaName, createDoc, doc, this.props.formToDomainDoc, this.props.domainToFormDoc, this.props.keyField)
    // }
  }
  docChange = form => {
    const docId = this.state.docId;
    if(docId) {
      const doc = this.props.docs[this.props.schemaName] ?
        this.props.docs[this.props.schemaName][docId] : null;
      if (doc) {
        this.setState({doc});
        this.props.transition('DOC_SELECTED');
      } else {
        //TODO doc getting REST call
        this.props.transition('DOC_GETTING');
      }
    } else {
      const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
        s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

      const tempId = ObjectId();
      this.props.docInitiate(this.props.schemaName, {}, this.props.keyField, tempId);
      this.setState({docId: tempId });
    }
  }
  render() {
    const docId = this.state.docId;
    const doc = this.props.docs[this.props.schemaName] && docId ?
      this.props.docs[this.props.schemaName][docId] : {};

    //300 millisecond delay for debounce
    const docChangeDebounced = debounceEventHandler(this.docChange, 300);
    return (
      <div className="doc-form-container">
        <div className="container">
          <Form
            safeRenderCompletion={true}
            formContext={this.state.doc}
            schema={this.props.schema}
            formData={ doc }
            uiSchema={this.props.uiSchema()}
            validate={this.props.validate}
            onChange={docChangeDebounced}
            onSubmit={this.docSave}
            //transformErrors={this.props.transformErrors}
            widgets={formWidgets}
            FieldTemplate={CustomFieldTemplate}
          />
        </div>
      </div>
    )
  }
}

var mapStateToProps = function (state) {
  return {
    docs: state.domain.docs
  }
}

//TODO make dispatches look cool like redux saga
//create named or unnamed param handler
var mapDispatchToProps = function (dispatch) {
  return {
    // setDisplay(setName, value){
    //     dispatch(actions.display.set(setName, value))
    // },
    // viewGet(schemaName, apiCall, id, transform){
    //     dispatch(viewGetFetch(schemaName, apiCall, id, transform));
    // },
    // docGetFetch(schemaName, apiCall, id, transform, keyField){
    //     dispatch(actions.docGetFetch(schemaName, apiCall, id, transform, keyField))
    // },
    docInitiate(schemaName, doc, keyField, tempId) {
      dispatch(docInitiate(doc, schemaName, tempId, keyField));
    },
    docChange(schemaName, doc, keyField, id, onChange){
      dispatch(docChange(schemaName, doc, keyField, id, onChange))
    },
    // docCreateFetch(schemaName, apiCall, doc, formToDomainDoc, domainToFormDoc, keyField){
    //     dispatch(actions.docCreateFetch(schemaName, apiCall, doc, formToDomainDoc, domainToFormDoc, keyField))
    // },
    // docUpdateFetch(schemaName, apiCall, doc, id, formToDomainDoc, domainToFormDoc, keyField){
    //     dispatch(actions.docUpdateFetch(schemaName, apiCall, doc, id, formToDomainDoc, domainToFormDoc, keyField))
    // }
  }
}

export default withStateMachine(machine)(connect(mapStateToProps, mapDispatchToProps)(DocFormContainer))
