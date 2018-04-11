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
	}

	onUpload(){
  	const curFiles = this.fileUpload.files;
  	this.setState({imageNum: curFiles.length})	
  	var storageRef = fire.storage().ref();
  	for (var i = 0; i<curFiles.length; i++){
  		let random = Math.floor(Math.random() * (100 - 0)) + 0 ;
  		let fileName = 'images/' + Date.now() +i + random + '.jpg'
  		var fileRef = storageRef.child(fileName);

  		fileRef.put(curFiles[i]).then((snapshot) => {
				fileRef.getMetadata().then((metadata) =>{
		  		const imageURL = snapshot.downloadURL
		  		this.setState({imageURL: this.state.imageURL.concat([imageURL])});
				}).catch(function(error) { });
		  });
  	}

  }


 

	render(){
		let preview
		let loadtext 
		console.log(this.state.imageNum)
		const imageURL = this.state.imageURL
		const imageNum = this.state.imageNum
		preview = imageURL.map((url,index) => {
			return(<img key={index} src={url}/>)
		})
		if (imageURL.length !== imageNum && imageNum !== 0){
			loadtext = <p>uploding</p>
		}else(
			loadtext= null 
		)

		return(
			<div>
				<label>Choose images to upload (PNG, JPG)
    			<input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" ref={(ref) => this.fileUpload = ref} multiple onChange={this.onUpload}/>
    		</label>
    		<div>{preview}</div>
    		<div>{loadtext}</div>
    		
    		
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

					<ImageUpload  name={itemName}/>
					
				  
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