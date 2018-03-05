import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import Home from './pages/home.js'; 
import DetailPage from './pages/detail.js';




const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/detail-page" component={DetailPage} />
    </div>
  </Router>
);




export default App;

