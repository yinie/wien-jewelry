import React from 'react';
import fire from '../components/firebase.js';
import { Link } from "react-router-dom";
import '../css/adminProduct.css';
import wienLogo from '../wien-logo.png'

class AdminNav extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userName:'',
			photoURL:''
		}

		this.logOut = this.logOut.bind(this)
	}

	componentDidMount(){
		const user = fire.auth().currentUser;
		console.log(user)
		this.setState({
			userName: user.displayName,
			photoURL: user.photoURL
		})
	}

	logOut(){
		fire.auth().signOut()
	}

	render(){
		const navLinks = ['home','products','orders','settings'];
		return(
			<div className='admin-nav'>
				<div className='nav-header'>
					<img alt="Wien logo" className="admin-logo"  src={wienLogo}/>
					<p className='nav-link nav-header-text'>product admin</p>
				</div>
				<ul>
					{
						navLinks.map((link, index)=>{
							if (link == this.props.activeNav){
								return(<li key={index} name={link} className='nav-link -active'><Link to={'/admin/'+link}>{link}</Link></li>)
							}else{
								return(<li key={index} name={link} className='nav-link'><Link to={'/admin/'+link}>{link}</Link></li>)
							}
						})
					}
				</ul>
				<div className="nav-profile">
					<img alt="avatar" className="avatar" src={this.state.photoURL}/>
					<p className="input-label">{this.state.userName}</p>
					<button className="button-cta-secondary" onClick={this.logOut}>Log out</button>
				</div>
			</div>
		)
	}
}

export default AdminNav;