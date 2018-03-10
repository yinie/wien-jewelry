import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from '../components/firebase.js';
import './home.css';
import wienLogo from '../wien-logo.png'

//Router test 



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
          <img className='card-img' src={this.props.item.image.image1}/>
          <div className='card-description'>
            <span>{this.props.item.name}</span> <span>{"$" + this.props.item.price}</span>
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
          image: Items[item].images
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
        <WienNav />
        <Fliter onFilterClick={this.onFilterClick}/>
        <div className="page-container">
          {
            catagoryFilter(this.state.productItems, this.state.sCatagory).map((item) => {
              return(
                <ProductCard key={item.itemId} material={item.material} item={item}/>
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