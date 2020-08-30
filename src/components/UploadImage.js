import React, { Component } from "react";
import Axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      UploadedData: []
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:3003/api/category")
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((err) => console.log(err));
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

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    // console.log(
    //   this.state.adTitle +
    //     this.state.adPrice +
    //     this.state.isFurnished +
    //     this.state.isNegotiable +
    //     this.state.adCategory +
    //     this.state.fileLinkInServer

    // );

    Axios
        .post(
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
            category: this.state.adCategory
          },
          this.state.config
        )
        .then((res) => {
          console.log(res);
          toast.success("Ad uploaded successfully");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Ad couldn't be uploaded");
        });

  };

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <form>
            <div className="form-group files">
              <label>
                <b>Upload your file</b>
              </label>
              <input
                type="file"
                className="form-control"
                name="myFile"
                onChange={this.onFileChange}
              />
            </div>

            <Button color="success" onClick={this.onSubmit} block>
              Upload Image
            </Button>
          </form>

          {/* {this.state.isFileUploaded ? ( */}
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

              <Button color="success" onClick={this.onSubmitForm} block>
                Upload
              </Button>
            </Form>
          {/* ) : (
            <h1>Upload an image first</h1>
          )} */}

          <div className="form-group">
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }
}
