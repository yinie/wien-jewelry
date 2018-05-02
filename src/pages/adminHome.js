import React from 'react';
import '../css/adminProduct.css';
import fire from '../components/firebase.js';
import '../css/adminProduct.css';
import AdminNav from '../components/AdminNav.js';

class TableItem extends React.Component{
	constructor(props){
		super(props);
		this.deleteItem = this.deleteItem.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	handleDelete(itemIndex){
		this.props.onDelete(itemIndex)
	}

	deleteItem(e){
		e.preventDefault();
		const itemRef = e.target.dataset.itemid;
		const itemIndex = e.target.dataset.index;
		console.log(itemRef + "   |"+ itemIndex )
		fire.database().ref('Items/' + itemRef).remove().then(()=>{
			this.handleDelete(itemIndex)
		});
		
	}

	render(){
		let colors = []
		let inventory = 0
		this.props.item.colors.forEach((color) =>{
			const colorTemp = color.color
			inventory = inventory + parseInt(color.inventory) 
			colors.push(colorTemp)
		})
		const colorNames = colors.toString()
		return(
			<div className="table-item">
				<div className="item-name">{this.props.item.itemName}</div>
				<div className="item-material">{this.props.item.material}</div>
				<div className="item-price">{this.props.item.price}</div>
				<div className="item-colors">{colorNames}</div>
				<div className="item-inventory">{inventory}</div>
				<button className="button-delete" onClick={this.deleteItem}><i data-itemid={this.props.item.itemId} data-index={this.props.index} className="far fa-trash-alt"></i></button>

			</div>
		)
	}
}


class AdminHome extends React.Component{
	constructor(props) {
    super(props);
    const itemsArray = Object.entries(this.props.productItems).map(item => {
		 	item[1].itemId = item[0];
		  return item[1]
		});

    this.state = {
      productItems: itemsArray,
    };
    this.onDelete = this.onDelete.bind(this)
  }

  onDelete(itemIndex){
  	const tempState = JSON.parse(JSON.stringify(this.state.productItems));
  	tempState.splice(itemIndex, 1);
  	this.setState({
			productItems: tempState
		})

  }

	render(){

		return(
			<div className='flex-container'>
				<AdminNav activeNav="home"/>
				<div className="form-container">
					<h1>Product Inventory</h1>
					<div className="table-header flex-container">
						<div className="item-name">Product Name</div>
						<div className="item-material">Material</div>
						<div className="item-price">Price</div>
						<div className="item-colors">Colors</div>
						<div className="item-inventory">Inventory</div>
					</div>
		
					{
						this.state.productItems.map((item,index)=>{
							return <TableItem key={index} index={index} item={item} onDelete={this.onDelete}/>
						})
					}
					
				</div>
			</div>
		)
	}
}

export default AdminHome