import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import MuiForm from "rjsf-material-ui";
import loginUISchema from "../schemas/login/loginUISchema";
import loginSchema from "../schemas/login/loginSchema";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async form => {
    this.setState({ isLoading: true });

    const {formData} = form;
    const {username, password } = formData;

    this.setState({ isLoading: true });
    try {
      await Auth.signIn(username, password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderForm() {
    return (
      <MuiForm
        uiSchema={loginUISchema()}
        schema={loginSchema()}
        onSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    return (
      <div className="Login">
          { this.renderForm() }
      </div>
    );
  }
}
