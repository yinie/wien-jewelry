import React from 'react';
import fire from '../components/firebase.js';
import '../css/adminProduct.css';
import AdminNav from '../components/AdminNav.js';
import ImageUpload from '../components/Imageupload.js'



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
				<AdminNav activeNav="products"/>
				<ProductForm />
			</div>
		)
	}
}


export default AdminProducts;