import React, { Component } from "react";
import SearchArea from "./SearchArea";
import LatestAds from "./LatestAds";

export default class AllAds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advert: [],
      filterId: this.props.match.params.advertid,
    };
  }

  render() {
    return (
      <div>
        <SearchArea />
        <LatestAds />
        {/* <h1>Welcome</h1> */}
      </div>
    );
  }
}
