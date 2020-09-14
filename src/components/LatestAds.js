import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import { Link } from "react-router-dom";

export default class LatestAds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adverts: [],
      filteredAd: false,
    };
  }

  componentDidMount() {
    // if (this.state.filteredAd) {
    axios
      .get("http://localhost:3003/api/advert/getAll")
      .then((res) => {
        this.setState({ adverts: res.data });
      })
      .catch((err) => console.log(err));
    // }
  }

  handleViewMore(advert) {
    this.setState({
      advertId: advert._id,
    });
  }

  render() {
    const location = this.props.location;
    const arr1 = this.state.adverts.filter((d) => d.location === location);

    return (
      <>
        <div>
          {location ? (
            <>
              <h2>Ads in {location}</h2>{" "}
              <div className="modal-body row">
                {arr1.map((advert) => {
                  return (
                    <div className="col-md-3" key={advert._id}>
                      <Card style={{ marginBottom: "30px" }}>
                        <CardImg
                          top
                          width="100%"
                          src={
                            advert.image
                              ? advert.image
                              : "http://localhost:3003/uploads/myFile-1594698945650.png"
                          }
                          alt="Card image cap"
                          style={{
                            width: "100%",
                            height: "15vw",
                            objectFit: "cover",
                          }}
                        />
                        <CardBody>
                          <CardTitle>
                            <strong>{advert.title}</strong>
                          </CardTitle>
                          <CardSubtitle>
                            <FontAwesomeIcon
                              icon={faMapMarkedAlt}
                              color="gray"
                            ></FontAwesomeIcon>
                            {"  " + advert.location}
                          </CardSubtitle>
                          <CardText>
                            <FontAwesomeIcon
                              icon={faInfoCircle}
                              color="gray"
                            ></FontAwesomeIcon>
                            {"  " + advert.description.slice(0, 10) + " ..."}
                          </CardText>
                          <Link
                            className="btn btn-outline-danger"
                            to={`/home/${advert._id}`}
                          >
                            View more
                          </Link>
                        </CardBody>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            null
          )}

          <h2>All Ads</h2>
          <div className="modal-body row">
            {this.state.adverts.map((advert) => {
              return (
                <div className="col-md-3" key={advert._id}>
                  <Card style={{ marginBottom: "30px" }}>
                    <CardImg
                      top
                      width="100%"
                      src={
                        advert.image
                          ? advert.image
                          : "http://localhost:3003/uploads/myFile-1594698945650.png"
                      }
                      alt="Card image cap"
                      style={{
                        width: "100%",
                        height: "15vw",
                        objectFit: "cover",
                      }}
                    />
                    <CardBody>
                      <CardTitle>
                        <strong>{advert.title}</strong>
                      </CardTitle>
                      <CardSubtitle>
                        <FontAwesomeIcon
                          icon={faMapMarkedAlt}
                          color="gray"
                        ></FontAwesomeIcon>
                        {"  " + advert.location}
                      </CardSubtitle>
                      <CardText>
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          color="gray"
                        ></FontAwesomeIcon>
                        {"  " + advert.description.slice(0, 10) + " ..."}
                      </CardText>
                      <Link
                        className="btn btn-outline-danger"
                        to={`/home/${advert._id}`}
                      >
                        View more
                      </Link>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
