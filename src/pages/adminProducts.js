import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from '../components/firebase.js';

class ImageUpload extends React.Component{
	constructor(props){
		super(props);
		this.onUpload = this.onUpload.bind(this);
	}

	onUpload(){
  	const curFiles = this.fileUpload.files;
  	console.log(curFiles)
  	var storageRef = fire.storage().ref();
		var mountainImagesRef = storageRef.child('images/mountains.jpg');
		mountainImagesRef.put(curFiles[0]).then(function(snapshot) {
  		console.log(snapshot);
		});
  }

	render(){
		return(
			<div>
				<label for="image_uploads">Choose images to upload (PNG, JPG)</label>
    		<input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" ref={(ref) => this.fileUpload = ref} onChange={this.onUpload}/>
    		<div className="preview">
				  <p>No files currently selected for upload</p>
				 </div>
			</div>
		)
	}
}

class ProductForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			itemName: '',
			category: '',
      material: '',
      price: '',
      images:['https://cdn2.dropmarkusercontent.com/257180/7c54be4973a0cd129d68087f0735aab4af1a4433/737B5294-min.jpg']
		}
		this.onSubmit = this.onSubmit.bind(this);
	}

  onChange = (e) => {
     const state = this.state
     state[e.target.name] = e.target.value;
     this.setState(state);
  }

  onSubmit(e){
  	e.preventDefault();
  	const item = this.state;
  	const newItemKey = fire.database().ref().child('Items').push().key;
  	var updates = {};
  	updates['/Items/' + newItemKey] = item;
  	console.log(newItemKey);
  	fire.database().ref().update(updates);
  }

  



	render(){
		const { itemName, category, material,price,images } = this.state;
		return(
			<div>
				<form>
					<label> 
						Product name
						<input type="text" name="itemName" value={itemName} onChange={this.onChange} />
					</label>
					<label> 
						Category
						<input type="text" name="category" value={category} onChange={this.onChange} />
					</label>
					<label> 
						Material
						<input type="text" name="material" value={material} onChange={this.onChange} />
					</label>
					<label> 
						Price
						<input type="text" name="price" value={price} onChange={this.onChange} />
					</label>

					<ImageUpload />
					
				  
          <button onClick={this.onSubmit}>Submit</button>
				</form>
			</div>
		)
	}
}



class AdminProducts extends React.Component{
	render(){
		return(
			<div>
				<h1>Admin Page</h1>
				<ProductForm />
			</div>
		)
	}
}


export default AdminProducts;