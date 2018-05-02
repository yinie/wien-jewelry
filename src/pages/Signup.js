import React from 'react';
import { Link } from "react-router-dom";
import fire from '../components/firebase.js';
import '../css/adminProduct.css';
import '../font-awesome/css/fontawesome-all.css'
import  coverImg from '../img/signup_cover.jpg'


class Signup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
				firstname:'',
				lastname:'',
      	email: '',
      	password: ''
    	};
    this.createAccount = this.createAccount.bind(this)
	}

	onChange = (e) => {
     const state = this.state
     state[e.target.name] = e.target.value;
     this.setState(state);
  }

	createAccount(){
		const email = this.state.email
		const password = this.state.password
		const displayName = this.state.firstname + ' ' + this.state.lastname
		fire.auth().createUserWithEmailAndPassword(email, password).then((user) =>
			user.updateProfile({
			  displayName: displayName,
			  photoURL: "https://firebasestorage.googleapis.com/v0/b/fir-test-c19d6.appspot.com/o/images%2Favatar.png?alt=media&token=04b524fe-c184-49fa-91f9-f8fc1e09fdca"
			})

			).catch(function(error) {
  		// Handle Errors here.
  		//var errorCode = error.code;
  		//var errorMessage = error.message;
  		// ...
		});
		const confModal = document.querySelector('.modal');
		const overLay = document.querySelector('.overlay');
  	confModal.style.display = 'block';
  	overLay.style.display = 'block';
	}

	render(){
		return(
			<div>
				<div className="flex-container">
					<div className="auth-section">
						<h1>Create account</h1>
						<label  className="input-label"> 
							First name
							<input type="text" name="firstname" onChange={this.onChange}  />
						</label>
						<label  className="input-label"> 
							Last name
							<input type="text" name="lastname"  onChange={this.onChange} />
						</label>
						<label  className="input-label"> 
							Email
							<input type="text" name="email"  onChange={this.onChange} />
						</label>
						<label  className="input-label"> 
							Password
							<input type="password" name="password" onChange={this.onChange} />
						</label>
						<button className="button-cta" onClick={this.createAccount}>createAccount</button>
						<p>Already have an account? <Link className="text-link" to="/signin">Sign in here</Link></p>
					</div>
					<div>
						<img alt="sign in cover" className="cover-img" src={coverImg}/>
					</div>
				</div>
				<div className="overlay"></div>
				<div className="modal">
						<div className="icon"><i className="fas fa-check-circle"></i></div>
						<p className="message">{'Welcome,' + this.state.firstname +'. Your accont is setup!'}</p>
						<button className="button-cta"><Link to="/signin">Sign In to My Acccount</Link></button>
				</div>
			</div>

		)
		
	}
}


export default Signup; 