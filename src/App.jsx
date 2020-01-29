import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import 'font-awesome/css/font-awesome.min.css'

import NavBar from "./Components/NavBar"
import List from "./Components/Pages/List"
import Edit from "./Components/Pages/Edit"
import Create from "./Components/Pages/Create"

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <Route path="/" exact component={List} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/create" component={Create} />
        </div>
      </Router>
    )
  }
}