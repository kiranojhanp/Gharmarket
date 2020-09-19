import React, { Component } from "react";
import axios from "axios";
import Comment from "./Comment";
import LineSeperator from "./LineSeperator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import * as jwtJsDecode from "jwt-js-decode";
import { toast, ToastContainer } from "react-toastify";

import { Button } from "reactstrap";

export default class AdPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advert: [],
      advertId: this.props.match.params.advertid,
      userId: "",
      config: {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      },
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      //get jwt token
      const token = localStorage.getItem("token");
      //send token to decode
      let tokenInfo = this.getDecodedAccessToken(token); // decode token
      let owner = tokenInfo.payload.id; // get token userid
      this.setState({
        userId: owner,
      });
    }

    axios
      .get(`http://localhost:3003/api/advert/getAll/${this.state.advertId}`)
      .then((res) => {
        this.setState({ advert: res.data });
      })
      .catch((err) => console.log(err));
  }

  getDecodedAccessToken(token) {
    try {
      return jwtJsDecode.jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(
        `http://localhost:3003/api/advert/${this.state.advertId}/comments`,
        this.state.config
      )
      .then((res) => {
        toast.success("Successfully deleted");
        console.log(res.data);
        this.setState({
          advert: res.data,
        });
      })
      .catch((err) => toast.error("Comment wasn't deleted" + err));
  };

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
            <h1 className="text-center" style={textStyle}>
              <small>
                <strong>{data.title}</strong>
              </small>
            </h1>{" "}
            <LineSeperator />
            <img
              src={
                data.image
                  ? data.image
                  : "http://localhost:3003/uploads/myFile-1594698945650.png"
              }
              className="img-fluid"
              alt={"Image of " + data.title}
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

                {data.owner === this.state.userId ? (
                  <li className="list-group-item">
                    <strong>Delete all comments: </strong>
                    <Button
                      color="danger"
                      outline
                      onClick={this.handleDelete}
                      style={{
                        border: "1px dotted red",
                        padding: "1px",
                        width: "23px",
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} color="red" />
                    </Button>
                  </li>
                ) : null}
              </ul>
            </div>

            {data.comment ? (
              <Comment comments={data.comment} adId={this.state.advertId} />
            ) : null}
          </div>

          <div className="form-group">
            <ToastContainer />
          </div>
        </div>
      </>
    );
  }
}
