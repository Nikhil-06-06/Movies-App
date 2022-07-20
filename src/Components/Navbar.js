import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class navbar extends Component {
  render() {
    return (
      <div style={{display:'flex'}}>
        <Link to="/" style={{textDecoration:'none'}}> <h1 style={{marginTop:'1.5rem', marginLeft:'2.5rem', fontWeight:'bold'}}>Movies</h1> </Link>
        <Link to="/favourites" style={{textDecoration:'none'}}> <h5 style={{marginTop:'2.5rem', marginLeft:'1.5rem'}}>Favourites</h5> </Link>
      </div>
    )
  }
}
