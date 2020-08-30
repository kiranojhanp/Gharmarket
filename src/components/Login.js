import React, { Component } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    axios
      .post("http://localhost:3003/api/users/login", this.state)
      .then((res) => {
        console.log(res);
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("token", res.data.token);
        this.setState({ isLoggedIn: true });
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="./" />;
    }
    return (
      <>
        <div className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12" style={{marginTop: "40%"}}>
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
                </FormGroup>
                <Button color="danger" onClick={this.handleSubmit} block>
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
