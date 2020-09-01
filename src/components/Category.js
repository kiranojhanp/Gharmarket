import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  UncontrolledAlert,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: "",
      categoryName: "",
      categories: [],
      isEdit: false,
      config: {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      },
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

  handleChange = (e) => this.setState({ categoryName: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.isEdit) {
      axios
        .put(
          `http://localhost:3003/api/category/${this.state.categoryId}`,
          { name: this.state.categoryName },
          this.state.config
        )
        .then((res) => {
          const updatedCategories = this.state.categories.map((category) => {
            if (category._id === this.state.categoryId) {
              category.name = this.state.categoryName;
            }
            return category;
          });
          this.setState({
            categories: updatedCategories,
            isEdit: false,
            categoryName: "",
            categoryId: "",
          });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          "http://localhost:3003/api/category",
          {
            name: this.state.categoryName,
          },
          this.state.config
        )
        .then((res) => {
          this.setState({
            categories: [...this.state.categories, res.data],
            categoryName: "",
          });
        })
        .catch((err) => console.log(err.response));
    }
  };

  deleteCategory = (categoryId) => {
    console.log(categoryId);
    axios
      .delete(
        `http://localhost:3003/api/category/${categoryId}`,
        this.state.config
      )
      .then((res) => {
        const filterCategories = this.state.categories.filter((category) => {
          return category._id !== categoryId;
        });
        this.setState({
          categories: filterCategories,
        });
      })
      .catch((err) => console.log(err));
  };

  editCategory = (categoryId) => {
    // edit value to forms
    this.setState({
      categoryName: this.state.categories.find((category) => {
        return category._id === categoryId;
      }).name,
      isEdit: true,
      categoryId: categoryId,
    });

    axios
      .get(
        `http://localhost:3003/api/category/${categoryId}`,
        this.state.config
      )
      .then()
      .catch();
  };

  render() {
    return (
      <div>
        
        <UncontrolledAlert style={{marginTop: "1rem"}} color="info"><FontAwesomeIcon icon={faInfoCircle} /> <span style={{margin: "0.2rem"}}></span>
          Category is similar to tags. This can be used to filter the
          searches later. Everybody can add categories.
        </UncontrolledAlert>

        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Add category..."
            value={this.state.categoryName}
            onChange={this.handleChange}
          />
          {this.state.isEdit ? (
            <Button color="warning" outline size="sm" className="mt-4" block>
              Update
            </Button>
          ) : (
            <Button color="danger" outline size="sm" className="mt-4" block>
              Add
            </Button>
          )}
        </Form>
        <hr />

        <ListGroup>
          {this.state.categories.map((category) => {
            return (
              <ListGroupItem
                key={category._id}
                onClick={() => this.editCategory(category._id)}
                style={{ cursor: "pointer" }}
              >
                <span>{category.name}</span>
                <Button
                  close
                  onClick={() => this.deleteCategory(category._id)}
                />
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}
