import React, { Component } from 'react';
import Places from './places/places';
import {Image} from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{display: "flex", justifyContent: "center", padding: "20px",alignContent: "center"}}>
          <Image src="logo.jpg" width="80px" height="120px" rounded/>
          <h1 className="logo-name">Partier</h1>
        </div>
        <div>
          
        </div>
        <Places />
      </div>
    );
  }
}

export default App;
