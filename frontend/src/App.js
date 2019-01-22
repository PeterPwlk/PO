import React, { Component } from "react";
import Places from "./places/places";
import PlacesList from "./components/placesList";
import { Image } from "react-bootstrap";
import { BrowserRouter as Router, Route, } from "react-router-dom";
import NavBar from "./components/navBar";
import WelcomePage from "./welcomePage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router >
        <div className="App">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              alignContent: "center"
            }}
          >
            <Image src="logo.jpg" width="80px" height="120px" rounded />
            <h1 className="logo-name">Partier</h1>
          </div>
          <NavBar />
          <div className="content">
            <Route path="/" exact component={WelcomePage} />
            <Route path="/szukajMiejsca" component={Places} />
            <Route path="/znalezioneMiejsca" component={PlacesList} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
