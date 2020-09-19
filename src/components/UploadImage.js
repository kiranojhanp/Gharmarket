import React, { Component } from "react";
import Axios from "axios";
import {
  UncontrolledCollapse,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Jumbotron,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkedAlt,
  faInfoCircle,
  faTimes,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as jwtJsDecode from "jwt-js-decode";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import LineSeperator from "./LineSeperator";

export default class UploadImage extends Component {
  constructor(props) {
    super(props);

    const options = [];
    for (let i = 1; i <= 15; i += 1) {
      options.push(i);
    }

    this.state = {
      myFile: null,
      fileLinkInServer: "",
      isFileUploaded: false,
      config: {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      },
      houseType: [
        "Apartment",
        "Townhouse",
        "Bungalow",
        "Mansion",
        "Cottage",
        "Cabin",
        "Castle",
        "Villa",
      ],
      floorOptions: options,
      categories: [],

      adTitle: "",
      adPrice: "",
      adLocation: "",
      adDescription: "",
      adHousetype: "",
      adFloors: "",
      isFurnished: "",
      isNegotiable: "",
      adCategory: "",

      UploadedData: [],
      adverts: [],
      tokenPayload: "",

      isEdit: false,
      clickedEditAdvertId: "",
      advertId: "",
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:3003/api/category")
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((err) => console.log(err));

    //get jwt token
    const token = localStorage.getItem("token");
    //send token to decode
    let tokenInfo = this.getDecodedAccessToken(token); // decode token
    let owner = tokenInfo.payload.id; // get token expiration dateTime

    Axios.get("http://localhost:3003/api/advert", {
      params: { ownerId: owner },
    })
      .then((res) => {
        this.setState({
          adverts: res.data,
        });
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

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("myFile", this.state.myFile);
    Axios.post("http://localhost:3003/api/upload", formData, this.state.config)
      .then((res) => {
        toast.success("upload success");

        this.setState({
          fileLinkInServer:
            "http://localhost:3003/uploads/" + res.data.filename,

          isFileUploaded: true,
        });

        console.log(this.state.fileLinkInServer);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Upload fail");
      });
  };

  onFileChange = (e) => {
    this.setState({
      myFile: e.target.files[0],
      loaded: 0,
    });
  };

  onSubmitForm = (e) => {
    e.preventDefault();

    if (this.state.isEdit) {
      Axios.put(
        `http://localhost:3003/api/advert/${this.state.advertId}`,
        {
          title: this.state.adTitle,
          price: this.state.adPrice,
          location: this.state.adLocation,
          image: this.state.fileLinkInServer,
          description: this.state.adDescription,
          houseType: this.state.adHousetype,
          floors: this.state.adFloors,
          isFurnished: this.state.isFurnished,
          isNegotiable: this.state.isNegotiable,
          category: this.state.adCategory,
        },
        this.state.config
      )
        .then((res) => {
          console.log(res);
          toast.success("Ad updated successfully");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Ad couldn't be updated");
        });
    } else {
      Axios.post(
        "http://localhost:3003/api/advert",
        {
          title: this.state.adTitle,
          price: this.state.adPrice,
          location: this.state.adLocation,
          image: this.state.fileLinkInServer,
          description: this.state.adDescription,
          houseType: this.state.adHousetype,
          floors: this.state.adFloors,
          isFurnished: this.state.isFurnished,
          isNegotiable: this.state.isNegotiable,
          category: this.state.adCategory,
        },
        this.state.config
      )
        .then((res) => {
          console.log(res);
          toast.success("Ad uploaded successfully");
          // this.setState({adverts: res.data})
        })
        .catch((err) => {
          console.error(err);
          toast.error("Ad couldn't be uploaded");
        });
    }
  };

  deleteData = (advertId) => {
    Axios.delete(
      `http://localhost:3003/api/advert/${advertId}`,
      this.state.config
    )
      .then((res) => {
        console.log(res.data);
        toast.success("Ad deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Ad couldn't be deleted");
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleEdit = (e) => {
    e.preventDefault();
    const advertId = e.target.value;

    this.setState({
      adTitle: this.state.adverts.find((advert) => {
        return advert._id === advertId;
      }).title,
      adPrice: this.state.adverts.find((advert) => {
        return advert._id === advertId;
      }).price,
      adLocation: this.state.adverts.find((advert) => {
        return advert._id === advertId;
      }).location,
      adDescription: this.state.adverts.find((advert) => {
        return advert._id === advertId;
      }).description,
      adHousetype: this.state.adverts.find((advert) => {
        return advert._id === advertId;
      }).houseType,
      adFloors: this.state.adverts.find((advert) => {
        return advert._id === advertId;
      }).floors,
      isFurnished: this.state.adverts.find((advert) => {
        return advert._id === advertId;
      }).isFurnished,
      isNegotiable: this.state.adverts.find((advert) => {
        return advert._id === advertId;
      }).isNegotiable,
      adCategory: this.state.adverts.find((advert) => {
        return advert._id === advertId;
      }).category,

      isEdit: true,
      advertId: advertId,
    });
  };

  handleDelete = (e) => {
    e.preventDefault();

    const advertId = e.target.value;
    console.log(advertId + " Deleted");

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this file?</p>
            <Button
              color="success"
              outline
              onClick={() => {
                this.deleteData(advertId);
                onClose();
              }}
            >
              <FontAwesomeIcon icon={faCheck} /> Yes
            </Button>

            <span style={{ margin: "1.2rem" }}></span>

            <Button color="danger" outline onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} /> No
            </Button>
          </div>
        );
      },
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Button
            outline
            block
            color="danger"
            id="toggler"
            style={{ marginBottom: "1rem", marginTop: "2rem" }}
          >
            Expand the form
          </Button>
          <UncontrolledCollapse toggler="#toggler">
            {!this.state.isEdit ? (
              <form>
                <div className="form-group files">
                  <label>
                    <b>Upload your Image</b>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="myFile"
                    onChange={this.onFileChange}
                  />
                </div>

                <Button outline color="success" onClick={this.onSubmit} block>
                  Upload Image
                </Button>
              </form>
            ) : null}

            <Form>
              <FormGroup>
                <Label for="adTitle">Title</Label>
                <Input
                  type="text"
                  name="adTitle"
                  id="adTitle"
                  onChange={this.handleChange}
                  value={this.state.adTitle}
                />
              </FormGroup>
              <FormGroup>
                <Label for="adPrice">Price</Label>
                <Input
                  type="text"
                  name="adPrice"
                  id="adPrice"
                  placeholder="in Nrs."
                  onChange={this.handleChange}
                  value={this.state.adPrice}
                />
              </FormGroup>
              <FormGroup>
                <Label for="adLocation">Location</Label>
                <Input
                  type="text"
                  name="adLocation"
                  id="adLocation"
                  onChange={this.handleChange}
                  value={this.state.adLocation}
                />
              </FormGroup>

              <FormGroup>
                <Label for="adDescription">Description</Label>
                <Input
                  type="textarea"
                  name="adDescription"
                  rows="5"
                  id="adDescription"
                  placeholder="Describe your advertisement here"
                  onChange={this.handleChange}
                  value={this.state.adDescription}
                />
              </FormGroup>

              <FormGroup>
                <Label for="adHousetype">House Type</Label>
                <Input
                  type="select"
                  name="adHousetype"
                  id="adHousetype"
                  onChange={this.handleChange}
                  value={this.state.adHousetype}
                >
                  {this.state.houseType.map((house, index) => (
                    <option key={index}>{house}</option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="adFloors">House Floors</Label>
                <Input
                  type="select"
                  name="adFloors"
                  id="adFloors"
                  onChange={this.handleChange}
                  value={this.state.adFloors}
                >
                  {this.state.floorOptions.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup tag="fieldset" onChange={this.handleChange}>
                <legend>Furnished</legend>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="isFurnished" value="true" /> Yes
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="isFurnished" value="false" /> No
                  </Label>
                </FormGroup>
              </FormGroup>

              <FormGroup tag="fieldset" onChange={this.handleChange}>
                <legend>Negotiable</legend>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" value="true" name="isNegotiable" />
                    Yes
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" value="false" name="isNegotiable" />
                    No
                  </Label>
                </FormGroup>
              </FormGroup>

              <FormGroup>
                <Label for="adCategory">Category</Label>
                <Input
                  type="select"
                  name="adCategory"
                  id="adCategory"
                  onChange={this.handleChange}
                  value={this.state.adCategory}
                >
                  {this.state.categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <Button outline color="success" onClick={this.onSubmitForm} block>
                Upload
              </Button>
            </Form>
          </UncontrolledCollapse>

          <div style={{ marginTop: "2rem" }}></div>
          <LineSeperator />
          <Jumbotron>
            <h2>My Ads</h2>
            <div className="modal-body row">
              {this.state.adverts.map((advert) => {
                return (
                  <div className="col-md-4" key={advert._id}>
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
                          {"  " + advert.description.slice(0, 15) + " ..."}
                        </CardText>
                        <hr />
                        <Button
                          outline
                          color="primary"
                          style={{ marginLeft: "2%" }}
                          value={advert._id}
                          onClick={this.handleEdit}
                        >
                          <FontAwesomeIcon icon={faEdit} /> {"  "}Edit
                        </Button>
                        <span style={{ margin: "1.2rem" }}></span>
                        <Button
                          outline
                          color="danger"
                          value={advert._id}
                          onClick={this.handleDelete}
                        >
                          <FontAwesomeIcon icon={faTimes} /> {"  "}Delete
                        </Button>
                      </CardBody>
                    </Card>
                  </div>
                );
              })}
            </div>
          </Jumbotron>
          <div className="form-group">
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
}
