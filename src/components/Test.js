import React, { Component } from 'react'

export default class Test extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       advert: [],
       advertId: this.props.match.params.advertid
    }
  }

  componentDidMount() {
    console.log(this.state.advertId);
  }
  
  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}
