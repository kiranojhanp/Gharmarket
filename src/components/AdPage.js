import React, { Component } from "react";
import axios from "axios";
import Comment from "./Comment";

export default class AdPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advert: [],
      advertId: this.props.match.params.advertid,
    };
  }

  componentDidMount() {
    // console.log(this.state.advertId);
    axios
      .get(`http://localhost:3003/api/advert/${this.state.advertId}`)
      .then((res) => {
        this.setState({ advert: res.data });
        console.log(this.state.advert);
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-sm-8">
            <h1>{this.state.advertId}</h1>
            <h1>{this.state.advert.floors}</h1>
            {/* <h1>{JSON.stringify(this.state.advert.comment)}</h1> */}
          </div>
          <div className="col-sm-4">
            {this.state.advert.comment ? (
              <Comment comments={this.state.advert.comment} />
            ) : null}
          </div>
        </div>
      </>
    );
  }
}
