import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      isRegistered: false,
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
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
  };

  render() {
    if (this.state.isRegistered) {
      return <Redirect to="/" />;
    }
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
            <Label for="lastName">Lastname</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
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
