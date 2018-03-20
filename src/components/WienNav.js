import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../pages/shop.css';
import '../font-awesome/css/fontawesome-all.css'
import wienLogo from '../wien-logo.png'
import '../font-awesome/css/fontawesome-all.css'


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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/detail-page">Blog</Link></li>
              <li><Link to="/detail-page">About</Link></li>
              <li><a href="https://www.instagram.com/wien_jewelry/"><i className="fab fa-instagram font-icon"></i></a></li>
              <li><a href=""><i className="fab fa-weixin font-icon"></i></a></li>
            </ul>
          </div>
        </div>
        <div>
          <ul className={this.state.menuClass}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/detail-page">Blog</Link></li>
              <li><Link to="/detail-page">About</Link></li>
              <li><a href="">Wechat</a></li>
              <li><a href="https://www.instagram.com/wien_jewelry/">Instagram</a></li>
          </ul>
        </div>
        <div className="overlay"></div>
      </div>
    )
  }
}

export default WienNav;