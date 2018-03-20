import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../font-awesome/css/fontawesome-all.css'
import './home.css'

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
		img: 'https://cdn2.dropmarkusercontent.com/257180/69b6993391789b0a65d2a6cb9d8398eadb25602f/5-1-min.jpg'
	},
	{
		legend:'image4',
		img: 'https://cdn2.dropmarkusercontent.com/257180/721e81ea6a4a9e46c037687b0fde8f29ff90dd9d/6-1-min.jpg'
	}
]


class CarouselLeftArrow extends React.Component{
	render(){
		return(
			<a href="#"className="carousel_arrow carousel_arrow-left" onClick={this.props.onClick}>
        <span>Previous</span>
      </a>
		)
	}
}

class CarouselRightArrow extends React.Component{
	render(){
		return(
			<a href="#" className="carousel_arrow carousel_arrow-right" onClick={this.props.onClick}>
        <span>Next</span>
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

		this.state = {
			activeIndex: 0,
			translateNum: 0
		};
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
      translateNum: -1000
    });


	}

	render(){
    let css = {
        transform: `translateX(-${this.state.activeIndex}00vw)`,
        

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
  		<h1>Home page</h1>
  		<Carousel slides={carouselSlidesData}/>
  		<Link to="/shop">Shop</Link>;
  		</div>
  	)
	}
}


export default Homepage;