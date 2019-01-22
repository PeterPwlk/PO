import {
  REQUEST_PLACES_PENDING,
  REQUEST_PLACES_SUCCESS,
  REQUEST_PLACES_FAILED,
  SELECT_EVENT_CITY,
  SELECT_EVENT_DATE,
  SELECT_EVENT_TYPE,
  REQUEST_EVENT_TYPES_PENDING,
  REQUEST_EVENT_TYPES_SUCCESS,
  REQUEST_EVENT_TYPES_FAILED
} from "../constants/places_constants";

export const requestPlaces = ({eventCity, eventType, eventDate}) => (dispatch) =>{
    dispatch({type: REQUEST_PLACES_PENDING});
    const placeQuery = {
        miasto: eventCity,
        rodzajWydarzenia: eventType,
        dataWydarzenia: eventDate
    };
    fetch('http://localhost:3001/miejsce', {
        method: "post",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(placeQuery)
    })
    .then(res => res.json())
    .then(data => dispatch({type: REQUEST_PLACES_SUCCESS, payload: data}))
    .catch(err => dispatch({type: REQUEST_PLACES_FAILED, payload: err}));
};

export const requestEventTypes = () => (dispatch) => {
    dispatch({type: REQUEST_EVENT_TYPES_PENDING});
    fetch('http://localhost:3001/rodzajeWydarzen')
    .then(res => res.json())
    .then(data => dispatch({type: REQUEST_EVENT_TYPES_SUCCESS, payload: data}))
    .catch(err => dispatch({type: REQUEST_EVENT_TYPES_FAILED, payload: err}))
}

export const selectEventCity = (city) => ({
    type: SELECT_EVENT_CITY,
    payload: city
});

export const selectEventType = (type) => ({
    type: SELECT_EVENT_TYPE,
    payload: type
});

export const selectEventDate = (date) =>({
    type: SELECT_EVENT_DATE,
    payload: date
});
