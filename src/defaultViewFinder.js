import React, { PureComponent } from 'react'

module.exports = class DefaultViewFinder extends PureComponent {
  render() {
    return (
      <div style={{
        border: '50px solid rgba(0, 0, 0, 0.3)',
        boxShadow: 'inset 0 0 0 5px rgba(255, 0, 0, 0.5)',
        flex: 1
      }} />
    )
  }
}