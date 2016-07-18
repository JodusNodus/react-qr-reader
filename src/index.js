import { Component } from 'react'
import ReactDOM from 'react-dom'
import h from 'react-hyperscript'
import QrReader from 'react-qr-reader'

class Demo extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: 'No result',
      error: false,
    }
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(){
    this.setState({
      error: true,
    })
    console.error('error')
  }
  render(){
    if(this.state.error){
      return h('h3', 'Demo could not be displayed.')
    }else{
      return h('div', [
        h(QrReader, {
          handleScan: this.handleScan.bind(this),
          handleError: this.handleError.bind(this)
        }),
        h('h3', `Decoded QR-Code: ${this.state.result}`)
      ])
    }
  }
}

ReactDOM.render(h(Demo), document.getElementById('demo-container'))
