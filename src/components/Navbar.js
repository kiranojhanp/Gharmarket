import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import * as jwtJsDecode from "jwt-js-decode";

export default class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isOpen: false,
      username: "",
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
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

    if (token) {
      let tokenInfo = this.getDecodedAccessToken(token); // decode token
      let owner = tokenInfo.payload.username; // get token role
      
      this.setState({ isLoggedIn: true, username: owner });
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.setState({ isLoggedIn: false });
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Gharmarket</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse navbar isOpen={this.state.isOpen}>
            <Nav className="mr-auto" navbar>
              {this.state.isLoggedIn ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Profile
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href="/profile">My Profile</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.logout}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <>
                  <NavItem>
                    <NavLink href="login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="register">Register</NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
            {/* <NavbarText>
              <b>User:</b>
              {this.state.username
                ? " " + localStorage.getItem("username")
                : " Not logged in"}
            </NavbarText> */}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
