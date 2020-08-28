import React from "react";
import { Container, Button, Link } from "react-floating-action-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStickyNote,
  faUserPlus,
  faPlus,
  faHouseUser,
  faUser
} from "@fortawesome/free-solid-svg-icons";

export default function FloatingActionButton() {
  return (
    <Container>
      {/* <Link href="#" tooltip="Create note link">
        <FontAwesomeIcon icon={faStickyNote} />
      </Link> */}
      <Link
        href="#"
        tooltip="Manage your Ads"
      >
        <FontAwesomeIcon icon={faUser} />
      </Link>
      <Button
        tooltip="Post your advertisement!"
        rotate={true}
        onClick={() => alert("FAB Rocks!")}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Container>
  );
}
