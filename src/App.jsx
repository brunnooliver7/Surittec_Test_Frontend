import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'font-awesome/css/font-awesome.min.css'

import NavBar from "./Components/NavBar"
import List from "./Pages/List"
import Edit from "./Pages/Edit"
import Create from "./Pages/Create"
import LoginPage from "./Pages/Login"

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path="/list" component={List} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/create" component={Create} />
        </div>
      </Router>
    )
  }
}