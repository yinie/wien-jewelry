import React from 'react';
import fire from '../components/firebase.js';
import './adminProduct.css';
import wienLogo from '../wien-logo.png'

class AdminNav extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className='admin-nav'>
				<div className='nav-header'>
					<img alt="Wien logo" className="admin-logo"  src={wienLogo}/>
					<h2 className='nav-header-text'>product admin</h2>
				</div>
				<ul>
					<li></li>
				</ul>
			</div>
		)
	}
}








class ImageUpload extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imageNum: 0,
			imageUploaded: []
		}
		this.onUpload = this.onUpload.bind(this);	
		this.handleImage = this.handleImage.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
	}

	handleImage(imageUploaded){
		this.props.passImage(imageUploaded);
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
		  		const imageUploaded = {imageRef: fileName ,imageURL: snapshot.downloadURL}
		  		this.setState({imageUploaded: this.state.imageUploaded.concat([imageUploaded])});
		  		this.handleImage(imageUploaded)
				}).catch(function(error) { });
		  });
  	}
  }

  deleteImage(e){
  	e.preventDefault();
  	const tempImages = JSON.parse(JSON.stringify(this.state.imageUploaded));
  	const index = e.target.name
  	const deleteRef = fire.storage().ref().child(tempImages[index].imageRef);
  	const temNum = this.state.imageNum;
  	deleteRef.delete().then(() => {
  		console.log("image deleted!")
  		tempImages.splice(index, 1);
  		console.log(tempImages)
  		this.setState({
  			imageUploaded: tempImages,
  			imageNum :temNum - 1
  		});

  		console.log("state updated!")
		}).catch(function(error) {
  		// Uh-oh, an error occurred!
		});

  }

	render(){	
		return(
			<div>
				<label>Choose images to upload (PNG, JPG)
    			<input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" ref={(ref) => this.fileUpload = ref} multiple onChange={this.onUpload}/>
    		</label>
    		{Array(this.state.imageNum).fill('foo').map((foo, index) => {
    			const imagePreview = this.state.imageUploaded[index]
    			if (imagePreview ) 
    				return (
    					<div key={index}>
    						<img src={imagePreview.imageURL} />
    						<button name={index} onClick={this.deleteImage}>Delete</button>
    					</div>)
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

  passImage(imageUploaded){
  	const state = this.state
  	state.images.push(imageUploaded);
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
			<div className='container'>
				<AdminNav />
				<ProductForm />
			</div>
		)
	}
}


export default AdminProducts;