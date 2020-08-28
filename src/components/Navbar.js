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
  NavbarText,
} from "reactstrap";

export default class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isOpen: false,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ isLoggedIn: true });
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
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
                    <DropdownItem href="/profile">Edit Profile</DropdownItem>
                    <DropdownItem>My ads</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.logout}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NavItem>
                  <NavLink href="login">Login</NavLink>
                </NavItem>
              )}
            </Nav>
            <NavbarText>Help</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
