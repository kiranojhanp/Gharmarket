import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Collapse, CardBody } from "reactstrap";

export default class AdPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      advert: [],
      advertId: this.props.match.params.advertid,
      collapse: 0,
      cards: [1, 2, 3, 4, 5],
    };
  }

  toggle = (e) => {
    let event = e.target.dataset.event;
    this.setState({
      collapse: this.state.collapse === Number(event) ? 0 : Number(event),
    });
  };

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
    const { cards, collapse } = this.state;

    const myStyle = {
      cursor: "pointer",
      marginBottom: "1rem",
    };

    return (
      <>
        <h1>{this.state.advertId}</h1>

        <h3 className="page-header">
          Reactstrap Accordion using card component
        </h3>
        {cards.map((index) => {
          return (
            <Card style={myStyle} key={index}>
              <CardHeader onClick={this.toggle} data-event={index}>
                Header
              </CardHeader>
              <Collapse isOpen={collapse === index}>
                <CardBody>Example</CardBody>
              </Collapse>
            </Card>
          );
        })}
      </>
    );
  }
}
