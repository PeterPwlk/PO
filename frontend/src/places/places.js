import React, { Component } from "react";
import {connect} from 'react-redux';
import EventTypeSelect from '../components/eventTypeSelect';
import {requestPlaces, selectEventCity, requestEventTypes, selectEventType} from '../actions/places_actions';
import {Grid, Row, Col, Button, FormControl} from 'react-bootstrap';
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import PlacesList from '../components/placesList';
import "./places.css";
import "../App.css";

const mapStateToProps = state => {
  return {
    placesRequest: {
      isPending: state.request.placesRequest.isPending,
      places: state.request.placesRequest.places,
      error: state.request.placesRequest.error,
    },
    eventTypesRequest: {
      isPending: state.request.eventTypesRequest.isPending,
      types: state.request.eventTypesRequest.types,
      error: state.request.eventTypesRequest.error
    },
    placesQuery: {
      eventCity: state.placesQuery.city,
      eventType: state.placesQuery.type,
      eventDate: state.placesQuery.date
    }
  }
}

const mapDispatchToPorps = (dispatch) => {
  return {
    onRequestPlaces: (placesQuery) => dispatch(requestPlaces(placesQuery)),
    onRequestEventTypes: () => dispatch(requestEventTypes()),
    onCityChange: (event) => dispatch(selectEventCity(event.target.value)),
    onEventTypeChange: (event) => dispatch(selectEventType(event.target.value))
  }
}


class Places extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null,
    };
  }
  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day,
    });
  }
  componentDidMount(){
    this.props.onRequestEventTypes();
  }
  render() {
    return (
      <Grid style={{width: "800px"}} className="places">
          <Row>
            <Col md={6}>
              <p style={{margin: "0", marginTop: "10px"}}>Wybierz date imprezy:</p>
              <DayPicker 
                selectedDays={this.state.selectedDay}
                onDayClick={this.handleDayClick}
                className="day-picker-size"
              />
            </Col>
            <Col md={6} style={{height: "100%"}}>
              <FormControl type="text" placeholder="Wprowadź miasto" onChange={this.props.onCityChange} className="input-width"/>
              <p className="text-left text-margin-top">Wybierz rodzaj imprezy</p>
              <EventTypeSelect 
                eventTypes={this.props.eventTypesRequest.types}
                onEventTypeSelect={this.props.onEventTypeChange}
              />
            </Col>
          </Row>
          <Row style={{display: "flex", justifyContent: "center"}}>
              <button onClick={() => this.props.onRequestPlaces(this.props.placesQuery)} className="btn-style">Szukaj Miejsca!</button>
          </Row>
          <PlacesList places={this.props.placesRequest.places}/>
      </Grid>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToPorps)(Places);
