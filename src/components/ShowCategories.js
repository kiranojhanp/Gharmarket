import React, { Component } from "react";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";
import axios from "axios";

export default class ShowCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: "",
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3003/api/category")
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((err) => console.log(err));
  }

  handleClick = (category) => {
    this.setState({
      categoryId: category._id,
    });
  };

  render() {
    return (
      <>
        <h2>Categories</h2>
        <ListGroup>
          {this.state.categories.map((category) => {
            return (
              <ListGroupItem
                key={category._id}
                style={{ color: "black", cursor: "pointer" }}
                onClick={() => this.handleClick(category)}
              >
                {category.name + " "}
                <Badge color="danger" pill>
                  {category.advert.length}
                </Badge>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </>
    );
  }
}
