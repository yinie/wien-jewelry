import React from 'react';
import fire from '../components/firebase.js';
import '../css/adminProduct.css';
import '../font-awesome/css/fontawesome-all.css'
import AdminNav from '../components/AdminNav.js';
import ImageUpload from '../components/Imageupload.js'
import {createBrowserHistory} from 'history'
const history = createBrowserHistory({})

class Signin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
      	email: '',
      	password: ''
    	};

    this.signIn = this.signIn.bind(this)
	}

	onChange = (e) => {
     const state = this.state
     state[e.target.name] = e.target.value;
     this.setState(state);
  }

  componentDidMount(){
  	fire.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    console.log(user.uid)
		    
		    // ...
		  } else {
		    // User is signed out.
		    // ...
		  }
		});
  }

  signIn(){
		const email = this.state.email
		const password = this.state.password
		fire.auth().signInWithEmailAndPassword(email, password).then(()=>{
			history.push('/admin/products')
			window.location.reload() 
		}).catch(function(error) {
  		var errorCode = error.code;
  		var errorMessage = error.message;
		});
	}

	render(){
		return(
			<div>
				<h1>Sign In</h1>
				<label  className="input-label"> 
					Email
					<input type="text" name="email" onChange={this.onChange}  />
				</label>
				<label  className="input-label"> 
					Password
					<input type="text" name="password" onChange={this.onChange}  />
				</label>
				<button className="button-cta" onClick={this.signIn}>Sign In</button>
			</div>

		)
		
	}
}


export default Signin; 