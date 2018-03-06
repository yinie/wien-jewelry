import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from '../components/firebase.js';
import imagefile from '../photo.jpg';
import './home.css'






class ProductCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      productItems:[],

    }};

    render(){
      return(
        <div className='product-card'>
          <img src={imagefile}/>
          <li>
            <span>Pearl Earring</span>
            <span>$45</span>
          </li>
          <li>The materail:xxx</li>
        </div>

        )};

}


class ProductList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {personState:[]};
  }

   componentDidMount(){
     const personFirebase = fire.database().ref('persons');
     personFirebase.on('value', (snapshot) => {
      let persons = snapshot.val();
      let newState = [];
      for (let personNum in persons){
        newState.push({
          id : personNum,
          firstname: persons[personNum].firstname,
          lastname: persons[personNum].lastname
        }); 
      };
     this.setState({
       personState: newState
     });

     });

   }


  render() {
    return (
      <div> 
        <h1>Home page</h1>;
        <ul>
         {this.state.personState.map((person)=>{
                  return(
                    <li key={person.id}>
                    <p>First Name: {person.firstname}</p>
                    <p>Last Name: {person.lastname}</p>
                    </li>
                  )

         })}
        </ul>
        <ProductCard/>
        
        <Link to="/detail-page">Details</Link>;
      </div>

    )
  }
}



export default ProductList;