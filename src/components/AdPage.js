import React, { Component } from "react";
import axios from "axios";
import Comment from "./Comment";
import LineSeperator from "./LineSeperator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default class AdPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advert: [],
      advertId: this.props.match.params.advertid,
    };
  }

  componentDidMount() {
    // console.log(this.state.advertId);
    axios
      .get(`http://localhost:3003/api/advert/getAll/${this.state.advertId}`)
      .then((res) => {
        this.setState({ advert: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const textStyle = {
      textTransform: "uppercase",
      color: "rgb(105,105,105)",
    };

    const data = this.state.advert;
    return (
      <>
        <div className="row">
          <div className="col-sm-7">
            {/* <h1>{this.state.advertId}</h1> */}
            <h1 className="text-center" style={textStyle}>
              <small>
                <strong>{this.state.advert.title}</strong>
              </small>
            </h1>{" "}
            <LineSeperator />
            <img
              src={
                this.state.advert.image
                  ? this.state.advert.image
                  : "http://localhost:3003/uploads/myFile-1594698945650.png"
              }
              className="img-fluid"
              alt={"Image of " + this.state.advert.title}
              style={{ marginBottom: "20px" }}
            />
            <div className="card">
              <h5 className="card-header">Description</h5>
              <div className="card-body">
                <p className="card-text">{data.description}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-4">
            <div
              className="card"
              style={{
                width: "320px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <div className="card-header">
                <strong>Details</strong>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Price:</strong>
                  {"  Rs." + data.price}
                </li>
                <li className="list-group-item">
                  <strong>Location:</strong>
                  {"  " + data.location}
                </li>
                <li className="list-group-item">
                  <strong>Housetype:</strong>
                  {"  " + data.houseType}
                </li>
                <li className="list-group-item">
                  <strong>Furnished: {"  "}</strong>
                  {data.isFurnished === false ? (
                    <FontAwesomeIcon icon={faTimes} color="red" />
                  ) : (
                    <FontAwesomeIcon icon={faCheck} color="green" />
                  )}
                </li>
                <li className="list-group-item">
                  <strong>Negotiable: {"  "}</strong>
                  {data.isNegotiable === false ? (
                    <FontAwesomeIcon icon={faTimes} color="red" />
                  ) : (
                    <FontAwesomeIcon icon={faCheck} color="green" />
                  )}
                </li>
                <li className="list-group-item">
                  <strong>Floors:</strong>
                  {"  " + data.floors}
                </li>
                <li className="list-group-item">
                  <strong>Housetype:</strong>
                  {"  " + data.houseType}
                </li>
              </ul>
            </div>

            {this.state.advert.comment ? (
              <Comment
                comments={this.state.advert.comment}
                adId={this.state.advertId}
              />
            ) : null}
          </div>
        </div>
      </>
    );
  }
}
