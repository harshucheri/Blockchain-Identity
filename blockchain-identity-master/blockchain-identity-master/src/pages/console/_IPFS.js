import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setIpfs } from 'actions/Network'

const HOST = process.env.HOST || 'localhost'

class IPFS extends Component {
  render() {
    return (
      <div className="d-flex mb-3 align-items-center">
        IPFS:
        <div className="btn-group btn-group-sm ml-2">
          <button
            className="btn btn-outline-secondary active"
            onClick={() =>
              this.props.setIpfs(`http://${HOST}:8080`, `http://${HOST}:5002`)
            }
          >
            Localhost
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              this.props.setIpfs('https://ipfs-gateway.vboss.tech', 'https://ipfs-gateway.vboss.tech')
            }
          >
            ipfs-gateway.vboss.tech
          </button>
          <button className="btn btn-outline-secondary">ipfs.infura.io</button>
          <button className="btn btn-outline-secondary">gateway.ipfs.io</button>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
// })

const mapDispatchToProps = dispatch => ({
  setIpfs: (gateway, api) => dispatch(setIpfs(gateway, api))
})

export default connect(null, mapDispatchToProps)(IPFS)
