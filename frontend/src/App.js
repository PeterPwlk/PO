import React, { Component } from "react";
import Places from "./components/places";
import PlacesList from "./components/placesList";
import { Image, Grid } from "react-bootstrap";
import { BrowserRouter as Router, Route, } from "react-router-dom";
import NavBar from "./components/navBar";
import WelcomePage from "./components/welcomePage";
import EventsList from "./components/eventsList";
import EventNew from "./components/eventNew";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router >
        <Grid className="App">
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
            <Route path="/twojeWydarzenia" component={EventsList} />
            <Route path="/noweWydarzenie" component={EventNew} />
          </div>
        </Grid>
      </Router>
    );
  }
}

export default App;
