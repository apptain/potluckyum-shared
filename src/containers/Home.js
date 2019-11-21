import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>PotLuckYum</h1>
        <p>A simple potluck app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderEventWizardRedirect() {
    return (
      <Redirect
        to={{
          pathname: "/potluck"
        }}
      />
    )
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderEventWizardRedirect(): this.renderLander() }
      </div>
    );
  }
}
