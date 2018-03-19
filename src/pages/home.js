import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../font-awesome/css/fontawesome-all.css'

const carouselSlidesData = [
	{
	  legend: 'image1',
		img: 'https://cdn2.dropmarkusercontent.com/257180/ed8fc4481558c92eed5d919823e5cdb1db8cbae4/pearl.jpg'

	},
	{
		legend:'image2',
		img:'https://cdn2.dropmarkusercontent.com/257180/fe4450a69cbabc853e3d4cd83138b47df6bbb40e/5-3-min.jpg'
	},
	{
		legend:'image3',
		img: 'https://cdn2.dropmarkusercontent.com/257180/fe4450a69cbabc853e3d4cd83138b47df6bbb40e/5-3-min.jpg'
	},
	{
		legend:'image4',
		img: 'https://cdn2.dropmarkusercontent.com/257180/721e81ea6a4a9e46c037687b0fde8f29ff90dd9d/6-1-min.jpg'
	}
]


class Homepage extends React.Component{
  render(){
  	return(
  		<div>
  		<h1>Home page</h1>
  		<Link to="/shop">Shop</Link>;
  		</div>
  	)
	}
}


export default Homepage;