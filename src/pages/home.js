import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from '../components/firebase.js';
import './home.css'


class Fliter extends React.Component{
  constructor(props){
    super(props);
    this.state = {}
    this.handleFilter = this.handleFilter.bind(this);
  };

  handleFilter(e){
    this.props.onFilterClick(e.target.dataset.catagory)
  }

  render(){
    return(
      <div className="filter">
        <button data-catagory="all" onClick={this.handleFilter}>All</button>
        <button data-catagory="earring" onClick={this.handleFilter}>Earring</button>
        <button data-catagory="necklace" onClick={this.handleFilter}>Necklace</button>
        <button data-catagory="ring" onClick={this.handleFilter}>Rings</button>
        <button data-catagory="bracelet" onClick={this.handleFilter}>Bracelets</button>
      </div>

    )
  }
}

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
      productItems:[],
      sCatagory:'all'
    };
    this.onFilterClick = this.onFilterClick.bind(this);
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
          catagory: Items[item].category,
          image: Items[item].images.image1
        });
      };
      this.setState({
        productItems: newItems
      });
    });
  }

  onFilterClick(cCatagory){
    this.setState({
      sCatagory: cCatagory
    })
  }

  render() {
    function catagoryFilter(Items,sCatagory) {
      if (sCatagory != "all"){
        return Items.filter(item => item.catagory === sCatagory)
      }else{
        return Items
      }
      
    }

    return (
      <div> 
        <div className="nav">Top Nav</div>
        <Fliter onFilterClick={this.onFilterClick}/>
        <div className="page-container">
          {
            catagoryFilter(this.state.productItems, this.state.sCatagory).map((item) => {
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