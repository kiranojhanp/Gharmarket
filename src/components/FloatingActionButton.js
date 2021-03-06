import React, { Component } from "react";
import { Container, Link } from "react-floating-action-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

export default class FloatingActionButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    return (
      <Container>
        {/* <Link href= "#" tooltip="Logout">
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Link> */}
        <Link href="/dashboard" tooltip="Add categories">
          <FontAwesomeIcon icon={faTag} />
        </Link>
        <Link
          tooltip="Post your advertisement!"
          rotate={true}
          href="/post-advert"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </Container>
    );
  }
}
