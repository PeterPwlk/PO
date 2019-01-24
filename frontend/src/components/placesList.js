import React,{Component} from "react";
import { Row, Col, Image, Badge } from "react-bootstrap";
import {connect} from "react-redux";
import "./placesList.css";
import "../App.css";

const mapStateToProps = state => {
  return {
      places: state.request.placesRequest.places
  }
     
};

class PlacesList extends Component{
  render(){
    const places = this.props.places;
    if (places.length > 0 && places !== undefined) {
      const placeList = places.map((place, i) => {
        return (
          <li key={i} className="placeCard">
            <Row className="placeCard-row">
              <Col md={4}>
                <Image src="restauracja.jpg" responsive />
              </Col>
              <Col md={5}>
                <h4 className="placeCard-name">{place.nazwa}</h4>
                <h5 className="placeCard-text">{`Adres: ${place.miasto}, ${
                  place.ulica
                } ${place.numer}`}</h5>
                <p className="placeCard-text">{`Opis: ${place.opis} ${
                  place.opis_u
                }`}</p>
              </Col>
              <Col md={3}>
                <p className="placeCard-rating placeCard-text">
                  Ocena:{" "}
                  <Badge>{Math.floor(Math.random() * (5 - 3) + 3)}</Badge>
                </p>
                <button className="btn-style">Szczegóły</button>
              </Col>
            </Row>
          </li>
        );
      });
      return <ul className="placeList">{placeList}</ul>;
    } else {
      return (
        <div className="placeList">
          <p className="placeCard-text" style={{fontSize: "16px",textAlign: "center"}}>Brak informacji o miejscach :(</p>
        </div>
      );
    }
  }

};


export default connect(mapStateToProps,null)(PlacesList);
