import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";

export default class SearchArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchLocation: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <Form style= {{marginTop: "2%"}}>
          <FormGroup>
            <Input
              type="text"
              name="searchLocation"
              placeholder="Enter location you want to buy house..."
              value={this.state.searchLocation}
              onChange={this.handleChange}
              style= {{height: "60px"}} />
          </FormGroup>
          <FormGroup>
            <Link
              type="button"
              className="btn btn-outline-danger btn-lg btn-block"
              to={`/home/${this.state.searchLocation}`}
            >
              Search
            </Link>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
