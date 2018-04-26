import React from 'react';
import { Link } from "react-router-dom";
import fire from '../components/firebase.js';
import '../css/adminProduct.css';
import '../font-awesome/css/fontawesome-all.css'
import AdminNav from '../components/AdminNav.js';
import ImageUpload from '../components/Imageupload.js'
import {createBrowserHistory} from 'history'
import  coverImg from '../img/signup_cover.jpg'
const history = createBrowserHistory({})

class Signin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
      	email: '',
      	password: '',
      	errorMsg: '',
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
			console.log("signin")
		  history.push('/admin/products')
			window.location.reload() 
		}).catch((error)=>{
			
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		this.setState({errorMsg:errorMessage})
		});
	}

	render(){
		return(
			<div className="flex-container">
				<div className="auth-section">
					<h1>Sign In</h1>
					<label  className="input-label"> 
						Email
						<input type="text" name="email" onChange={this.onChange}  />
					</label>
					<label  className="input-label"> 
						Password
						<input type="password" name="password" onChange={this.onChange}  />
					</label>
					<div className="error-msg">{this.state.errorMsg? (<p>{this.state.errorMsg}</p>):(null)}</div>
					<button className="button-cta" onClick={this.signIn}>Sign In</button>
					<p>Don't have an account? <Link className="text-link" to="/signup">Create an account</Link></p>
				</div>
				<div>
					<img className="cover-img" src={coverImg}/>
				</div>
			</div>

		)
		
	}
}


export default Signin; 