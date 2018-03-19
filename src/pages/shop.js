import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from '../components/firebase.js';
import './shop.css';
import '../font-awesome/css/fontawesome-all.css'
import wienLogo from '../wien-logo.png'


class WienNav extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      menuVisible:false,
      menuClass: 'menu-mobile'
    }
    this.burgerToggle = this.burgerToggle.bind(this)

  };

  burgerToggle() {
      let overLay = document.querySelector('.overlay');
      if ( this.state.menuVisible == false){
        this.setState({menuVisible: true, menuClass:'menu-mobile menu-display'});
        overLay.style.display = 'block';
      }else{
        this.setState({menuVisible: false, menuClass:'menu-mobile menu-hide'});
        overLay.style.display = 'none';
      }
    }

  render(){
   
   
    return(
      <div className="wien-nav">

        <span className="menu-icon" onClick={this.burgerToggle}><i className="fas fa-bars"></i></span>
        <img className="wien-logo"  src={wienLogo}/>
        <div className="nav-description"> 
          <p>Free Shipping - On US/CHIN oders over $55</p>  
          <div className='menu-desktop'>
            <ul>
              <li><Link to="/detail-page">Home</Link></li>
              <li><Link to="/">Shop</Link></li>
              <li><Link to="/detail-page">Blog</Link></li>
              <li><Link to="/detail-page">About</Link></li>
              <li><a href="https://www.instagram.com/wien_jewelry/"><i className="fab fa-instagram font-icon"></i></a></li>
              <li><a href=""><i className="fab fa-weixin font-icon"></i></a></li>
            </ul>
          </div>
        </div>
        <div>
          <ul className={this.state.menuClass}>
              <li><Link to="/detail-page"><i className="fas fa-home font-icon"></i>Home</Link></li>
              <li><Link to="/detail-page"><i className="fas fa-shopping-bag font-icon"></i>Shop</Link></li>
              <li><Link to="/detail-page"><i className="fas fa-rss-square font-icon"></i>Blog</Link></li>
              <li><Link to="/detail-page"><i className="fas fa-rss-square font-icon"></i>About</Link></li>
              <li><a href=""><i className="fab fa-weixin font-icon"></i>Wechat</a></li>
              <li><a href="https://www.instagram.com/wien_jewelry/"><i className="fab fa-instagram font-icon"></i>Instagram</a></li>
          </ul>
        </div>
        <div className="overlay"></div>
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
            <span>{this.props.item.itemName}</span> <span className="price">{"$" + this.props.item.price}</span>
          </div>
          <div>{"material: " + this.props.item.material}</div>
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