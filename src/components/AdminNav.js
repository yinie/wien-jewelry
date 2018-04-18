import React from 'react';
import fire from '../components/firebase.js';
import { Link } from "react-router-dom";
import '../pages/adminProduct.css';
import wienLogo from '../wien-logo.png'

class AdminNav extends React.Component{
	constructor(props){
		super(props);
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
			</div>
		)
	}
}

export default AdminNav;