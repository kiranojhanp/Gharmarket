import React, { Component } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";

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
    const val = this.state.searchLocation;
    return (
      <div>
        <Form style={{ marginTop: "2%" }}>
          <FormGroup>
            <Input
              type="text"
              name="searchLocation"
              placeholder="Enter location you want to buy house..."
              value={this.state.searchLocation}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Button
              color="danger"
              block
              outline
              onClick={this.props.action.bind(this, val)}
            >
              Search
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
