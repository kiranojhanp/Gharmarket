import React, { Component } from "react";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>Welcome to secure area {localStorage.getItem("username")}</h3>
      </div>
    );
  }
}
