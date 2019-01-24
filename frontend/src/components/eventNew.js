import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, FormControl } from "react-bootstrap";
import {requestEventTypes} from "../actions/places_actions";
import {selectEventDate,selectEventName,selectEventType, requestEventCreate} from "../actions/events_actions";
import EventTypeSelect from '../components/eventTypeSelect';
import DayPicker from "react-day-picker";
import {Link} from "react-router-dom";
import "react-day-picker/lib/style.css";
import "./places.css";
import "../App.css";
import "./eventNew.css";

const mapStateToProps = state => {
    return {
        eventTypesRequest: {
            isPending: state.request.eventTypesRequest.isPending,
            types: state.request.eventTypesRequest.types,
            error: state.request.eventTypesRequest.error
          },
          newEvent:{
            isPending: state.requestEvents.newEvent.isPending,
            redirect: state.requestEvents.newEvent.redirect,
            error: state.requestEvents.newEvent.error
          },
          event: state.newEvent
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onRequestEventTypes: () => dispatch(requestEventTypes()),
        onEventNameChange: (event) => dispatch(selectEventName(event.target.value)),
        onEventTypeChange: (event) => dispatch(selectEventType(event.target.value)),
        onEventDateChange: (date) => dispatch(selectEventDate(date)),
        onCreateEvent: (event) => dispatch(requestEventCreate(event))
    }
}

class EventNew extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: null
    };
  }
  handleDayClick(day, { selected }) {
    this.props.onEventDateChange(day);
    this.setState({
      selectedDay: selected ? undefined : day
    });
    
  }
  componentDidMount(){
    this.props.onRequestEventTypes();
  }
  render() {
     return (
     <Grid style={{ width: "750px" }} className="event-new">
        <Row>
          <h1>Nowe Wydarzenie</h1>
        </Row>
        <Row>
          <Col md={4}>
            <FormControl type="text" placeholder="Nazwa wydarzenia" onChange={this.props.onEventNameChange}/>
          </Col>
          <Col md={4}>
            <p style={{paddingLeft: "70px"}}>Rodzaj wydarzenia</p>
          </Col>
          <Col md={4}>
            <EventTypeSelect 
                eventTypes={this.props.eventTypesRequest.types}
                onEventTypeSelect={this.props.onEventTypeChange}
                margin={false}
              />
          </Col>
        </Row>
        <Row style={{paddingRight: "200px", marginTop: "20px"}}>
          <p>Data wydarzenia</p>
          <DayPicker
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
            className="day-picker-size"
          />
        </Row>
        <Row>
          <button className="btn-style" onClick={() => this.props.onCreateEvent(this.props.event)}>Stwórz</button>
        </Row>
        {(this.props.newEvent.redirect)
        ?(<div className="message">
            <p>Utworzono nowe Wydarzenie</p>
            <Link to="/twojeWydarzenia">
                <button className="btn-style">Wróć</button>
            </Link>
        </div>)
        :(<div></div>)}
      </Grid>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventNew);
