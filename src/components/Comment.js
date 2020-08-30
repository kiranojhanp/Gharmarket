import React, { Component } from "react";

export default class Comment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             comment: ""
        }
    }

    
  render() {
    console.log(this.props.comments);

    return (
      <>
        <div className="detailBox">
          <div className="titleBox">
            <label>Comments & Reviews</label>
          </div>
          <div className="actionBox">
            <ul className="commentList">
              {this.props.comments.map((comment) => {
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
                        on {comment.updatedAt}
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
                  placeholder="Your comments"
                />
              </div>
              <div className="form-group">
                <button className="btn btn-default">Add</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
