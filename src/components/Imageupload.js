import React from 'react';
import fire from '../components/firebase.js';
import '../css/adminProduct.css';

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


export default ImageUpload;
