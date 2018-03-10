import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from '../components/firebase.js';
import './home.css';
import wienLogo from '../wien-logo.png'

class WienNav extends React.Component{
  render(){
    return(
      <div className="wien-nav">
        <img className="wien-logo" src={wienLogo}/>
        <div className="nav-description">
          <p>Free Shipping - On US/CHIN oders over $55</p>
          <div>
            <ul>
              <li>Sign in</li>
              <li>English</li>
              <li>Wechat</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

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
      <Link to={"/detail-page/"+this.props.item.itemId} target="_blank">
        <div className='product-card'>
          <img className='card-img' src={this.props.item.images[0]}/>
          <div className='card-description'>
            <span>{this.props.item.itemName}</span> <span>{"$" + this.props.item.price}</span>
          </div>
          <div>{"The materail: " + this.props.item.material}</div>
        </div>
      </Link>
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

  onFilterClick(cCatagory){
    this.setState({
      sCatagory: cCatagory
    })
  }

  render() {
    function catagoryFilter(Items,sCatagory) {
      const itemsArray = Object.entries(Items).map(item => {
        item[1].itemId = item[0];
        return item[1]
      });
      if (sCatagory != "all"){
        return itemsArray.filter(item => item.category === sCatagory)
      }else{
        return itemsArray
      }
      
    }

    return (
      <div> 
        <WienNav />
        <Fliter onFilterClick={this.onFilterClick}/>
        <div className="page-container">
          {
            catagoryFilter(this.props.productItems, this.state.sCatagory).map((item,index) => {
              return(
                <ProductCard key={index} item={item}/>
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