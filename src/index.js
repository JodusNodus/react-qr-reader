import { Component } from 'react'
import ReactDOM from 'react-dom'
import h from 'react-hyperscript'
import QrReader from 'react-qr-reader'

class Demo extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: 'No result',
      facingMode: 'front',
      error: false,
    }

    this.handleFacingModeChange = this.handleFacingModeChange.bind(this)
    this.handleScan = this.handleScan.bind(this)
    this.handleError = this.handleError.bind(this)
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
  }
  handleFacingModeChange(e){
    this.setState({
      facingMode: e.target.value,
    })
  }
  render(){
    if(this.state.error){
      return h('h3', 'Demo could not be displayed.')
    }else{
      console.log(this.refs.reader)
      return h('div', [
        h(QrReader, {
          handleScan: this.handleScan,
          handleError: this.handleError,
          facingMode: this.state.facingMode,
          ref: 'reader',
        }),
        h('p', [
          'Facing Mode: ',
          h('select', {
            onChange: this.handleFacingModeChange,
            style: {
              marginTop: 10,
            },
          }, [
            h('option', {value: 'front'}, 'Front'),
            h('option', {value: 'back'}, 'Back'),
          ]),
        ]),
        h('h3', `Decoded QR-Code: ${this.state.result}`),
      ])
    }
  }
}

ReactDOM.render(
  h(Demo),
  document.getElementById('demo-container')
)
