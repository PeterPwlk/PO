import React,{Component} from "react";
import {Grid, Row, Col, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import "../App.css";

const MapStateToProps = state => {
    return {
        events: state.requestEvents.eventsRequest.events
    }
}

class EventEdit extends Component {
    render(){
        const {events} = this.props;
        console.log(this.props.match.params.id);
        return (
            <Grid>
                <Row>
                    <h2>Twoje wydarzenie</h2>
                </Row>
                <Row>
                    <Col>
                        <Image src="restauracja.jpg"></Image>
                        
                    </Col>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Link to="/twojeWydarzenia">
                        <button className="btn-style">Zapisz</button>
                    </Link>
                </Row>
            </Grid>
        )
    }
}

export default connect(MapStateToProps,null)(EventEdit);