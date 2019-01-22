import React from "react";
import {Link} from "react-router-dom";
import "./navBar.css";

const NavBar = () => {
  return (
    <nav>
      <ul className="navigation">
        <li>
          <Link to="/szukajMiejsca">Szukaj Miesca</Link>
        </li>
        <li>
          <Link to="/szukajUslug">Szukaj Usług</Link>
        </li>
        <li>
          <Link to="/twojeWydarzenia">Twoje Wydarzenia</Link>
        </li>
        <li>
          <Link to="/wyloguj">Wyloguj się</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
