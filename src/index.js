import React, { Component } from "react"
import ReactDOM from "react-dom"
import h from "react-hyperscript"
import QrReader from "react-qr-reader"

class Demo extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: "No result"
    }
  }
  handleScan(data){
    this.setState({
      result: data
    })
  }
  handleError(){
    console.error("error")
  }
  render(){
    return h("div", [
      h(QrReader, {
        height: 480,
        width: 640,
        handleScan: this.handleScan.bind(this),
        handleError: this.handleError
      }),
      h("p", this.state.result)
    ])
  }
}

ReactDOM.render(h(Demo), document.getElementById("demo-container"))
