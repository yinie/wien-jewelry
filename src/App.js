import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router'
import fire from './components/firebase.js';
import ProductList from './pages/shop.js'; 
import DetailPage from './pages/detail.js';
import Homepage from './pages/home.js';
import AdminProducts from './pages/adminProducts.js'
import AdminHome from './pages/adminHome.js'
import Signin from './pages/signin.js'
import Signup from './pages/Signup.js'


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      productItems: undefined ,
      userInfo: undefined ,
      loggedIn: undefined,
    };
  }

  componentDidMount(){
    // fire.auth().signOut()
    fire.database().ref('Items').once('value').then((snapshot)=>{
      this.setState({productItems: snapshot.val()});
    });

    
    fire.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        this.setState({loggedIn:true});
      } else {
         this.setState({loggedIn:false});
      }
    });

  }
  render(){

    if (this.state.productItems){
      return(
        <Router>
          <div>
            <Route  exact path="/" render={() => <Homepage />} />
            
            <Route path="/signup" render={() => <Signup /> } />
            <Route exact path="/signin" render={() => (
              this.state.loggedIn ? (
                <Redirect to="/admin/products"/>
              ) : (
                <Signin />
              )
            )}/>

            <Route exact path="/admin/products" render={() => (
              this.state.loggedIn ? (
                <AdminProducts />
              ) : (
                <Redirect to="/signin"/>
              )
            )}/>
            
            <Route path="/admin/home" render={() => <AdminHome />} />
            <Route path="/shop" render={() => <ProductList productItems={this.state.productItems}/>} />
            <Route path="/detail-page/:id" render={({match}) => <DetailPage match={match} productItems={this.state.productItems}/>} />

          </div>
        </Router>
      )
    }else{
      return(<p>Loading</p>)
    }
  }
}





export default App;

