import React from 'react';
import fire from '../components/firebase.js';
import './adminProduct.css';




class ImageUpload extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imageNum: 0,
			imageURL: []
		}
		this.onUpload = this.onUpload.bind(this);	
		this.handleImage = this.handleImage.bind(this);
	}

	handleImage(imageURL){
		this.props.passImage(imageURL);
	}

	onUpload(){
  	const curFiles = this.fileUpload.files;
  	let numState = this.state.imageNum
  	this.setState({imageNum: numState + curFiles.length})	
  	var storageRef = fire.storage().ref();
  	for (var i = 0; i<curFiles.length; i++){
  		let random = Math.floor(Math.random() * (100 - 0)) + 0 ;
  		let fileName = 'images/' + Date.now() +i + random + '.jpg'
  		var fileRef = storageRef.child(fileName);

  		fileRef.put(curFiles[i]).then((snapshot) => {
				fileRef.getMetadata().then((metadata) =>{
		  		const imageURL = snapshot.downloadURL;
		  		this.setState({imageURL: this.state.imageURL.concat([imageURL])});
		  		this.handleImage(imageURL)
				}).catch(function(error) { });
		  });
  	}
  }
 

	render(){
	
		
		return(
			<div>
				<label>Choose images to upload (PNG, JPG)
    			<input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" ref={(ref) => this.fileUpload = ref} multiple onChange={this.onUpload}/>
    		</label>
    		{Array(this.state.imageNum).fill('foo').map((foo, index) => {
    			if (this.state.imageURL[index]) return <img key={index} src={this.state.imageURL[index]} />
    			else return <p key={index}>Loading</p>
    		})}
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
      images:[]
		}
		this.onSubmit = this.onSubmit.bind(this);
		this.passImage = this.passImage.bind(this);
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

  passImage(imageURL){
  	const state = this.state
  	console.log(state)
  	state.images.push(imageURL);
  	this.setState(state);
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

					<ImageUpload  passImage={this.passImage}/>
					
				  
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