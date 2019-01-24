import {
REQUEST_EVENTS_PENDING,
REQUEST_EVENTS_SUCCESS,
REQUEST_EVENTS_FAILED,
SELECT_EVENT_NAME,
SELECT_EVENT_TYPE,
SELECT_EVENT_DATE,
REQUEST_EVENT_CREATE_FAILED,
REQUEST_EVENT_CREATE_PENDING,
REQUEST_EVENT_CREATE_SUCCESS,
RESTORE_EVENT_CREATE
} from "../constants/events_constants";

export const requestEvents = () => (dispatch) =>{
    dispatch({type: REQUEST_EVENTS_PENDING});
    fetch("http://localhost:3001/wydarzenia")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        dispatch({type: REQUEST_EVENTS_SUCCESS, payload: data})})
    .catch(err => dispatch({type: REQUEST_EVENTS_FAILED, payload:err}))
}

export const requestEventCreate = (event) => (dispatch) => {
    dispatch({type: REQUEST_EVENT_CREATE_PENDING});
    const newEvent = {
        name: event.name,
        date: event.date,
        id: 21,
        type: event.type
    };
    fetch("http://localhost:3001/wydarzenie", {
        method: "put",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newEvent)
    })
    .then(data => dispatch({type: REQUEST_EVENT_CREATE_SUCCESS, payload: data}))
    .catch(err => dispatch({type: REQUEST_EVENT_CREATE_FAILED, payload: err}))
}

export const selectEventName = (name) => ({
    type: SELECT_EVENT_NAME,
    payload: name
});

export const selectEventType = (type) => ({
    type: SELECT_EVENT_TYPE,
    payload: type
});

export const selectEventDate = (date) => ({
    type: SELECT_EVENT_DATE,
    payload: date
});

export const restore = () => ({
    type: RESTORE_EVENT_CREATE,
    payload: false
})