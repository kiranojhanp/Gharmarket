import React, { Component } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultState = {
  username: "",
  password: "",
  isLoggedIn: false,
  unameErr: "",
  pwErr: "",
};

export default class Login extends Component {
  state = defaultState;

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      unameErr: "",
      pwErr: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    let unameErr = "";
    let pwErr = "";

    if (!this.state.username) {
      unameErr = "Username is required";
    }

    if (!this.state.password) {
      pwErr = "Password is required";
    }

    if (unameErr || pwErr) {
      this.setState({
        unameErr: unameErr,
        pwErr: pwErr,
      });
      return false;
    }

    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    const isValid = this.validate();

    if (isValid) {
      axios
        .post("http://localhost:3003/api/users/login", this.state)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          this.setState({ isLoggedIn: true });
        })
        .catch((err) => toast.error(err));

      this.setState(defaultState);
    }
  };

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="./" />;
    }

    const dangerspan = {
      color: "red",
    };

    return (
      <>
        <div className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <div
              id="login-box"
              className="col-md-12"
              style={{ marginTop: "40%" }}
            >
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  {this.state.unameErr ? (
                    <span style={dangerspan}>{this.state.unameErr}</span>
                  ) : null}
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  {this.state.pwErr ? (
                    <span style={dangerspan}>{this.state.pwErr}</span>
                  ) : null}
                </FormGroup>
                <Button color="danger" onClick={this.handleSubmit} block>
                  Login
                </Button>
              </Form>
            </div>
            <div className="form-group">
              <ToastContainer />
            </div>
          </div>
        </div>
      </>
    );
  }
}
