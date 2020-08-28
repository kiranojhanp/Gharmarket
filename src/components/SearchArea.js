import React, { Component } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";

export default class SearchArea extends Component {
  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Input
              type="text"
              name="search"
              id="search"
              placeholder="Enter location you want to buy house..."
            />
          </FormGroup>
          <Button color="danger" block>
            Search
          </Button>
        </Form>
      </div>
    );
  }
}
