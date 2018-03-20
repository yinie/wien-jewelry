import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../font-awesome/css/fontawesome-all.css'
import './home.css'
import WienNav from '../components/WienNav.js'

const carouselSlidesData = [
	{
	  legend: 'image1',
		img: 'https://cdn2.dropmarkusercontent.com/257180/a481610a1bfcaed5122d97bf5a225e76e8717380/pearl1.jpg'

	},
	{
		legend:'image2',
		img:'https://cdn2.dropmarkusercontent.com/257180/fa60602aeebc3a4acaa2854c2ca9db5dbc2274c3/image2.jpg'
	},
	{
		legend:'image3',
		img: 'https://cdn2.dropmarkusercontent.com/257180/2327f1ee37f12679420f78c2c51b878b48b79999/image3.jpg'
	},	

	{
		legend:'image4',
		img: 'https://cdn2.dropmarkusercontent.com/257180/e066f8dc669e4f22df90fa90922bf5fbd77d7752/image4.jpg'
	}
]


class CarouselLeftArrow extends React.Component{
	render(){
		return(
			<a href="#"className="carousel_arrow carousel_arrow-left" onClick={this.props.onClick}>
        <span><i class="fas fa-chevron-left"></i></span>
      </a>
		)
	}
}

class CarouselRightArrow extends React.Component{
	render(){
		return(
			<a href="#" className="carousel_arrow carousel_arrow-right" onClick={this.props.onClick}>
        <span><i class="fas fa-chevron-right"></i></span>
      </a>
		)
	}
}

class CarouselSlide extends React.Component{
	render(){
		return(

			<li className={
          this.props.index == this.props.activeIndex
            ? "carousel-slide carousel-slide-active"
            : "carousel-slide"
        }>
			<img src={this.props.slide.img} />
			<p>{this.props.slide.legend}</p>
			</li>
		)
	}
}


class Carousel extends React.Component{
	constructor(props){
		super(props);
		this.goToNextSlide = this.goToNextSlide.bind(this);
		this.goToPrevSlide = this.goToPrevSlide.bind(this);
		this.NextSlide = this.NextSlide.bind(this);

		this.state = {
			activeIndex: 0,
			translateNum: 0
		};
	}

	componentDidMount(){
		setInterval(this.NextSlide, 3000);
	}



	goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let slides = this.props.slides;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index, 
    });
  }

  NextSlide(){
  	let index = this.state.activeIndex;
		let slides = this.props.slides;
		let slidesLength = slides.length - 1;

		if (index === slidesLength) {
      index = -1;
    }

    ++index;


    this.setState({
      activeIndex: index,
      
    });
  }


	goToNextSlide(e){
		e.preventDefault();
		let index = this.state.activeIndex;
		let slides = this.props.slides;
		let slidesLength = slides.length - 1;

		if (index === slidesLength) {
      index = -1;
    }

    ++index;


    this.setState({
      activeIndex: index,
      
    });
	}

	render(){
    let css = {
        transform: `translateX(-${this.state.activeIndex*96}vw)`,


    }
		return(
			<div className="carousel-container" >
				<CarouselLeftArrow onClick={e => this.goToPrevSlide(e)} />
				<ul className="carousel" style={css}>
          {this.props.slides.map((slide, index) =>
            <CarouselSlide key={index} index={index} activeIndex={this.state.activeIndex} slide={slide}/>
          )}
        </ul>
        <CarouselRightArrow onClick= {e => this.goToNextSlide(e)}/>
			</div>
		)
	}
}

class Homepage extends React.Component{
  render(){
  	return(
  		<div>
  		<WienNav />
  		<Carousel slides={carouselSlidesData}/>
  		<Link to="/shop">Shop</Link>;
  		</div>
  	)
	}
}


export default Homepage;