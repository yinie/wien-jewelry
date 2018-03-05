import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DetailPage extends React.Component {
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