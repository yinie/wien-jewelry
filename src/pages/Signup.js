import React from 'react';
import fire from '../components/firebase.js';
import '../css/adminProduct.css';
import '../font-awesome/css/fontawesome-all.css'


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
		fire.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		// ...
		});
	}

	render(){
		return(
			<div>
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
					<input type="text" name="password" onChange={this.onChange} />
				</label>
				<button className="button-cta" onClick={this.createAccount}>createAccount</button>
			</div>

		)
		
	}
}


export default Signup; 