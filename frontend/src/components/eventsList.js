import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { requestEvents, restore } from "../actions/events_actions";
import {Link, Route} from "react-router-dom";
import EventCard from "./eventCard";
import EventEdit from "./eventEdit";
import "../App.css";
import "./eventsList.css";
import "./eventCard.css";

const mapStateToProps = state => {
  return {
    eventsRequest: {
      isPending: state.requestEvents.eventsRequest.isPending,
      events: state.requestEvents.eventsRequest.events,
      error: state.requestEvents.eventsRequest.events
    }
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestEvents: () => dispatch(requestEvents()),
    restore: () => dispatch(restore())
  };
};

class EventsList extends Component {
  componentDidMount() {
    this.props.restore();
    this.props.onRequestEvents();
  }
  render() {
    const events = this.props.eventsRequest.events;
    console.log(`${this.props.match.path}/:id`);
    const eventsCardList = events.map((event,i) => {
      return (
        <Col md={5} className="eventCard" style={{margin: "30px"}} key={i}>
          <EventCard
            name={event.nazwa}
            date={event.data_wydarzenia}
            place="Restauracja"
            guestsNumber={event.guestsNumber}
            index={i}
            match={this.props.match.url}
          />
        </Col>
      );
    });
    return (
      <Grid style={{ width: "750px" }}>
        <Row>
          <h2 className="pageTitle">Twoje Wydarzenia</h2>
          <Link to="/noweWydarzenie">
            <button className="btn-style btn-new-event">Nowe wydarzenie</button>
          </Link>
        </Row>
        <Row>{eventsCardList}</Row>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsList);
