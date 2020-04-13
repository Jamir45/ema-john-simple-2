import React from 'react';
import './App.css';
import Header from './Componant/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}
from "react-router-dom";
import Shop from './Componant/Shop/Shop';
import Review from './Componant/Review/Review';
import Manage from './Componant/Manage/Manage';
import Productdetails from './Componant/Product Details/Productdetails';
import Login from './Componant/Login/Login';
import { AuthContextProvider, PrivateRoute } from './Componant/Login/useAuth';
import Shipment from './Componant/Shipment/Shipment';

function App() {
  return (
    <div>
      {/* আমরা useAuth.js file এ AutContextProvider নামে একটি network তৈরি করেছি । তাই এখানে আমরা সেই AutContextProvider টাকে call করে এর ভিতরে website এর সবগুলো component দিয়ে দিয়েছি */}
      <AuthContextProvider>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/manage">
              <Manage></Manage>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <Route path="/product/:key">
              <Productdetails></Productdetails>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
