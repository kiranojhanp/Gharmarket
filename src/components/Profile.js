import React, { Component } from "react";
import * as jwtJsDecode from "jwt-js-decode";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: false,
    };
  }

  getDecodedAccessToken(token) {
    try {
      return jwtJsDecode.jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  componentDidMount() {
    //get jwt token
    const token = localStorage.getItem("token");
    //send token to decode
    let tokenInfo = this.getDecodedAccessToken(token); // decode token
    let owner = tokenInfo.payload; // get token role
    this.setState({
      role: owner,
    });
  }

  render() {
    return (
      <>
        <div style={{marginTop: "2rem"}}>
          <h5>Firstname:</h5>
          <p>{this.state.role.firstName}</p>
          <hr />
          <h5>Lastname:</h5>
          <p>{this.state.role.lastName}</p>
          <hr />
          <h5>Username:</h5>
          <p>{this.state.role.username}</p>
          <hr />
          <h5>User type:</h5>
          <p>{this.state.role.role}</p>
          <hr />
          <h5>Photo:</h5>
          <img
          style={{width: "20%"}}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
            class="card-img-top"
            alt="User identifier"
          ></img>
          <hr />
        </div>
      </>
    );
  }
}
