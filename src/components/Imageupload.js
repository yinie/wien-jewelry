import React from 'react';
import fire from '../components/firebase.js';
import '../css/adminProduct.css';

class ImageUpload extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imageNum: 0,
      imagenames: [],
			imageUploaded: []
		}
		this.onUpload = this.onUpload.bind(this);	
		this.handleImage = this.handleImage.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
	}

	handleImage(imageUploaded){
		this.props.passImage(imageUploaded.imageURL);
	}

	onUpload(){
  	const curFiles = this.fileUpload.files;
    console.log(curFiles)
   	let numState = this.state.imageNum
  	this.setState({imageNum: numState + curFiles.length})	
  	var storageRef = fire.storage().ref();
  	Array.from(curFiles).forEach((file,index) => {
  		let random = Math.floor(Math.random() * (100 - 0)) + 0 ;
  		let fileName = 'images/' + Date.now() + index + random + '.jpg'
  		var fileRef = storageRef.child(fileName);
  		fileRef.put(file).then((snapshot) => {
				fileRef.getMetadata().then((metadata) =>{ 
		  		const imageUploaded = {imageRef: fileName ,imageURL: snapshot.downloadURL}
		  		this.setState({imageUploaded: this.state.imageUploaded.concat([imageUploaded])});
          this.setState({imagenames: this.state.imagenames.concat([file.name])})
		  		this.handleImage(imageUploaded)
				}).catch(function(error) { });
		  });
  	});
   
  }


  deleteImage(e){
  	e.preventDefault();
  	const tempImages = JSON.parse(JSON.stringify(this.state.imageUploaded));
  	const index = e.target.dataset.index
    
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
				
    		{Array(this.state.imageNum).fill('foo').map((foo, index) => {
    			const imagePreview = this.state.imageUploaded[index]
          const imageNames = this.state.imagenames
    			if (imagePreview ) 
    				return (
    					<div key={index} className="form-block flex-container">
    						<img alt="product preview" className="image-preview" src={imagePreview.imageURL} />
                <p className="image-name">{imageNames[index]}</p>
    						<button className="button-delete" onClick={this.deleteImage}><i  data-index={index} className="far fa-trash-alt"></i></button>
    					</div>)
    			else return (
            <div key={index} className="form-block flex-container">
             <p ><i class="fas fa-spinner"></i> Uploading</p>
            </div>
            ) 
    		})}
        <label className="text-link">+ Upload Images
          <input className="fileinput" type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" ref={(ref) => this.fileUpload = ref} multiple onChange={this.onUpload}/>
        </label>
			</div>
		)
	}
}


export default ImageUpload;
