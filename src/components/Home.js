import React from "react";
import { Jumbotron } from "reactstrap";
import SearchArea from "./SearchArea";
import ShowCategories from "./ShowCategories";
import LatestAds from "./LatestAds";

import FloatingActionButton from "./FloatingActionButton";

export default function Home() {
  return (
    <>
    <Jumbotron>
      <SearchArea />
    </Jumbotron>
    <Jumbotron>
        <ShowCategories />
    </Jumbotron>
    <Jumbotron>
        <LatestAds />
    </Jumbotron>
    <FloatingActionButton />
    </>
  );
}
