import React from 'react'

export default class SpaceRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      height: this.props.h + 'px',
      background: this.props.bc || 'transparent'
    }
  }

  render() {
    return (
      <div
        style={{
          height: this.state.height,
          background: this.state.background
        }}
      >
        {' '}
      </div>
    )
  }
}
