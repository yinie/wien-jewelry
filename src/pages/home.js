import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from '../components/firebase.js';
import './home.css'


class ProductCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
    }
  };

  render(){
    return (
      <div className='product-card'>
        <img className='card-img' src={this.props.image}/>
        <div className='card-description'>
          <span>{this.props.name}</span> <span>{"$" + this.props.price}</span>
        </div>
        <div>The materail:xxx</div>
      </div>
    );
  };
}


class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productItems:[]
    };
  }

  componentDidMount(){
    const itemsFirebase = fire.database().ref('Items');
    itemsFirebase.once('value', (snapshot)=>{
      let Items = snapshot.val();
      let newItems = [];
      for(let item in Items){
        newItems.push({
          itemId : item,
          name: Items[item].itemName,
          price: Items[item].price,
          material: Items[item].material,
          category: Items[item].category,
          image: Items[item].images.image1
        });
      };
      this.setState({
        productItems: newItems
      });
    });
  }

  render() {
    return (
      <div> 
        <div className="nav">Top Nav</div>
        <div className="page-container">
          {
            this.state.productItems.map((item) => {
              return(
                <ProductCard key={item.itemId} name={item.name} price={item.price} image={item.image}/>
              )
            })  
          }  
        </div>
        <Link to="/detail-page">Details</Link>;
      </div>

    )
  }
}

export default ProductList;