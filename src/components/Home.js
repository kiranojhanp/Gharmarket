import React, { Component } from "react";
import { Jumbotron } from "reactstrap";
import SearchArea from "./SearchArea";
import ShowCategories from "./ShowCategories";
import LatestAds from "./LatestAds";

import FloatingActionButton from "./FloatingActionButton";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "",
    };

    this.handler = this.handler.bind(this);
  }

  handler(val) {
    this.setState({
      location: val,
    });
  }

  render() {
    console.log(this.state.location);
    return (
      <>
        <Jumbotron>
          <SearchArea action={this.handler} />
        </Jumbotron>
        <Jumbotron>
          <ShowCategories />
        </Jumbotron>
        <Jumbotron>
          <LatestAds location={this.state.location} />
        </Jumbotron>
        <FloatingActionButton />
      </>
    );
  }
}
