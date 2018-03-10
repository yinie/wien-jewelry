import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from '../components/firebase.js';
import ProductCard from './home.js'
import './home.css';


class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sProduct: undefined 
    };
  }

  componentDidMount(){
  	this.setState({
  		sProduct: this.props.productItems[this.props.match.params.id]
  	})
  }

  render(){
  	if (this.state.sProduct){
	    return (
	    	<div>
	    		<h1></h1>
	    		<Link to="/">Home</Link>
	    		<p>Name: {this.state.sProduct.itemName}</p>
	    		<p>Price: {this.state.sProduct.price}</p>
	    		<img className="product-card" src={this.state.sProduct.images[0]} />
	    	</div>
	    )
	  }else{
	  	return(<p>Loading</p>)
	  }
	}  
}



export default DetailPage;