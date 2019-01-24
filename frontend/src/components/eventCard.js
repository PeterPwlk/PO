import React from "react";
import {Image, Badge} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../App.css";

const EventCard = ({name, date, place, guestsNumber, match, index}) => {
    return (
        <>
            <h3>{name}</h3>
            <Image src="restauracja.jpg" responsive/>
            <p>{(date)?date.substring(0,10):"2019-08-12"}</p>
            <p>{place}</p>
            <p>Goście <Badge>{guestsNumber}</Badge></p>
                <button className="btn-style">Edytuj</button>
        </>
    )
}

export default EventCard;