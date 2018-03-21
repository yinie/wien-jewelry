import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import fire from './components/firebase.js';
import ProductList from './pages/shop.js'; 
import DetailPage from './pages/detail.js';
import Homepage from './pages/home.js';



class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      productItems: undefined ,
    };
  }

  componentDidMount(){
    fire.database().ref('Items').once('value').then((snapshot)=>{
      this.setState({productItems: snapshot.val()});
    });
  }
  render(){
    if (this.state.productItems){
      return(
        <Router>
          <div>
            <Route  exact path="/" render={() => <Homepage />} />
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

