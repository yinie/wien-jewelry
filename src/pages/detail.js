import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from '../components/firebase.js';
import ProductCard from './home.js'


class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product:[],
    };
    
  }
  render() {
    return (
    	<div>
    		<h1>This is detail page</h1>
    		<Link to="/">Home</Link>;


    	</div>
    )
  }
}



export default DetailPage;