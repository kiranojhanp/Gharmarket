import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import axios from "axios";

import { Link } from "react-router-dom";

export default class LatestAds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adverts: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3003/api/advert")
      .then((res) => {
        this.setState({ adverts: res.data });
      })
      .catch((err) => console.log(err));
  }


  handleViewMore(advert) {

    this.setState({
      advertId: advert._id
    })




  }

  render() {
    return (
      <div>
        <h2>Latest Ads</h2>
        <div className="modal-body row">
          {this.state.adverts.map((advert) => {
            return (
              <div className="col-md-3" key = {advert._id}>
                <Card style = {{marginBottom: "30px"}}>
                  <CardImg
                    top
                    width="100%"
                    src="https://reactstrap.github.io/assets/318x180.svg"
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle>{advert.title}</CardTitle>
                    <CardSubtitle>{advert.location}</CardSubtitle>
                    <CardText>{advert.description}</CardText>
                    <Link className = "btn btn-outline-danger" to={`/home/${advert._id}`}>View more</Link>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
