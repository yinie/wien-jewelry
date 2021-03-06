import React from 'react';
import { Link } from "react-router-dom";
import './shop.css';


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
	    		<Link to="/">Home</Link>
	    		<p>Name: {this.state.sProduct.itemName}</p>
	    		<p>Price: {this.state.sProduct.price}</p>
	    		<img alt={this.state.sProduct.itemName} className="product-card" src={this.state.sProduct.images[0]} />
	    	</div>
	    )
	  }else{
	  	return(<p>Loading</p>)
	  }
	}  
}



export default DetailPage;