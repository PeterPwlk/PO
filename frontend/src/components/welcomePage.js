import React, { Component } from "react";
import {Link} from "react-router-dom";
import "../App.css";

class WelcomePage extends Component {
  render() {
      return (
        <div>
        <h2 style={{color: "#eb4486"}}>Witaj w Partier!</h2>
        <h4 style={{color: "whitesmoke"}}>Pomożemy Ci zorganizować Twoją idealną imprezę</h4>
        <div>
            <Link to="/szukajMiejsca">
                <button className="btn-style" style={{margin: "40px"}}>Szukaj miejsca</button>
            </Link>
            <Link to="/szukajMiejsca">
                <button className="btn-style" style={{margin: "40px"}}>Szukaj usług</button>
            </Link>
        </div>
      </div>
      )
  }
}

export default WelcomePage;
