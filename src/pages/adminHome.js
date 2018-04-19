import React from 'react';
import fire from '../components/firebase.js';
import '../css/adminProduct.css';
import AdminNav from '../components/AdminNav.js';


class AdminHome extends React.Component{
	render(){
		return(
			<div className='container'>
				<AdminNav activeNav="home"/>
				<h1>Admin Home</h1>
			</div>
		)
	}
}

export default AdminHome