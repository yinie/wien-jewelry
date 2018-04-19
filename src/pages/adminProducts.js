import React from 'react';
import fire from '../components/firebase.js';
import '../css/adminProduct.css';
import AdminNav from '../components/AdminNav.js';
import ImageUpload from '../components/Imageupload.js'


class AddColor extends React.Component{
	constructor(props){
		super(props)
		this.state={
			colors:'',
			colorNum: 1
		}
	}

	render(){
		return(

			<label className="input-label">Colors
				<div className="form-block flex-container">
					<label className="input-label">
						Color
						<input className="input-small" type="text"  /> 
					</label>
					<label className="input-label">
						Inventory
					 <input  className="input-small" type="number"/>
					</label>
				</div>
				<button>+ Add Color</button>
			</label>
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
      price: '$ ',
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
			<div className="form-container">
				<h1>Add New Product</h1>
				<form className="flex-container">
					<div className="form-content-half">	
						<label  className="input-label"> 
							Product Name
							<input type="text" name="itemName" value={itemName} onChange={this.onChange} />
						</label>
						<label  className="input-label"> 
							Material
							<input type="text" name="material" value={material} onChange={this.onChange} />
						</label>
						<label className="input-label"> 
							Category
							<select name="category" value={category} onChange={this.onChange}>
								<option value="">Select category</option>
							  <option value="earring">Earring</option>
							  <option value="necklace">Necklace</option>
							  <option value="rings">Rings</option>
							  <option value="bracelets">Bracelets</option>
							</select>
						</label>			
						<label className="input-label"> 
							Price
							<input type="text" name="price" value={price} onChange={this.onChange} />
						</label>
						<label className="input-label">
							Description
							<textarea></textarea>
						</label>
					</div>

					<div className="form-content-half">
						<AddColor />
						<ImageUpload  passImage={this.passImage}/>
					</div>			
				</form>
				<button class="button-cta" onClick={this.onSubmit}>Save Product</button>
			</div>
		)
	}
}



class AdminProducts extends React.Component{
	render(){
		return(
			<div className='flex-container'>
				<AdminNav activeNav="products"/>
				<ProductForm />
			</div>
		)
	}
}


export default AdminProducts;