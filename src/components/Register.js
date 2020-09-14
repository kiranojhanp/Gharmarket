import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inititalState = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  email: "",

  unameErr: "",
  pwErr: "",
  emailerr: "",
  fnameErr: "",
  lnameErr: "",
};

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",

      unameErr: "",
      pwErr: "",
      emailerr: "",
      fnameErr: "",
      lnameErr: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    let unameErr = "";
    let pwErr = "";
    let emailerr = "";
    let fnameErr = "";
    let lnameErr = "";

    if (!this.state.username) {
      unameErr = "Username is required";
    }

    if (!this.state.password) {
      pwErr = "Password is required";
    }

    if (!this.state.email.includes("@")) {
      emailerr = "Email is invalid";
    }

    if (!this.state.firstName) {
      fnameErr = "Firstname is required";
    }
    if (!this.state.lastName) {
      lnameErr = "Lastname is required";
    }

    if (unameErr || pwErr || emailerr || fnameErr || lnameErr) {
      this.setState({
        unameErr: unameErr,
        pwErr: pwErr,
        fnameErr: fnameErr,
        lnameErr: lnameErr,
        emailerr: emailerr,
      });
      return false;
    }

    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const isValid = this.validate();

    if (isValid) {
      axios
        .post("http://localhost:3003/api/users/register", this.state)
        .then((res) => {
          console.log(res);
          toast.success("🦄 Registration success!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({ isRegistered: true });
        })
        .catch((err) => {
          console.error(err);
          toast.error(err + " Registration fail");
        });

      // clear form
      this.setState(inititalState);
    }
  };

  render() {
    if (this.state.isRegistered) {
      return <Redirect to="/" />;
    }

    const dangerspan = {
      color: "red",
    };

    return (
      <div>
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstName">Firstname</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            {this.state.fnameErr ? (
              <span style={dangerspan}>{this.state.fnameErr}</span>
            ) : null} <br />
            <Label for="lastName">Lastname</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            {this.state.lnameErr ? (
              <span style={dangerspan}>{this.state.lnameErr}</span>
            ) : null} <br />
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.emailerr ? (
              <span style={dangerspan}>{this.state.emailerr}</span>
            ) : null} <br />
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            /> 
            {this.state.unameErr ? (
              <span style={dangerspan}>{this.state.unameErr}</span>
            ) : null} <br />
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {this.state.pwErr ? (
              <span style={dangerspan}>{this.state.pwErr}</span>
            ) : null} <br />
          </FormGroup>
          <Button color="danger" onClick={this.handleSubmit} block>
            Register
          </Button>
        </Form>

        <div className="form-group">
          <ToastContainer />
        </div>
      </div>
    );
  }
}
