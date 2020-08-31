import React, { Component } from "react";
import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      },
      comment: "",
      comments: this.props.comments

    };
  }

  handleChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handleCommentAdd = (e) => {
    e.preventDefault();
    Axios.post(
      `http://localhost:3003/api/advert/${this.props.adId}/comments`,
      {comment: this.state.comment},
      this.state.config
    )
      .then((res) => {
        toast.success("Successfully commented");
        this.setState({
            comment: "",
            comments: res.data
        })
      })
      .catch((err) => {
        console.error(err);
        toast.error("Could not comment! try again");
      });
  };


  render() {
    return (
      <>
        <div className="detailBox">
          <div className="titleBox">
            <label>Comments & Reviews</label>
          </div>
          <div className="actionBox">
            <ul className="commentList">
              {this.state.comments.map((comment) => {
                return (
                  <li key={comment._id}>
                    <div className="commenterImage">
                      <img
                        src="http://placekitten.com/50/50"
                        alt="Commented by"
                      />
                    </div>
                    <div className="commentText">
                      <p className="">{comment.comment}</p>{" "}
                      <span className="date sub-text">
                        on {moment(comment.updatedAt).format('MMMM Do YYYY')}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <form className="form-inline">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Your comment"
                  name="comment"
                  value={this.state.comment}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <button
                  type="button"
                  onClick={this.handleCommentAdd}
                  className="btn btn-outline-primary"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          
          <div className="form-group">
            <ToastContainer />
          </div>
        </div>
      </>
    );
  }
}
