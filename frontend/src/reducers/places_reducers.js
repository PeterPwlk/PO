import {
    REQUEST_PLACES_PENDING,
    REQUEST_PLACES_SUCCESS,
    REQUEST_PLACES_FAILED,
    REQUEST_EVENT_TYPES_PENDING,
    REQUEST_EVENT_TYPES_SUCCESS,
    REQUEST_EVENT_TYPES_FAILED,
    SELECT_EVENT_CITY,
    SELECT_EVENT_DATE,
    SELECT_EVENT_TYPE
  } from "../constants/places_constants";

const initialStatePlaces = {
    placesRequest: {
        isPending: false,
        places: [],
        error: ''
    },
    eventTypesRequest: {
        isPending: false,
        types: [],
        error: ''
    }
};

export const request = (state = initialStatePlaces, action = {}) => {
    switch(action.type){
        case REQUEST_PLACES_PENDING:
            return {...state, placesRequest:{...state.placesRequest,isPending: true }}
        case REQUEST_PLACES_SUCCESS:
            return {...state, placesRequest:{...state.placesRequest,places: action.payload, isPending: false}}
        case REQUEST_PLACES_FAILED:
            return {...state, placesRequest:{...state.placesRequest,error: action.payload, isPending: false}}
        case REQUEST_EVENT_TYPES_PENDING:
            return {...state, eventTypesRequest:{...state.eventTypesRequest, isPending: true }}
        case REQUEST_EVENT_TYPES_SUCCESS:
            return {...state, eventTypesRequest:{...state.eventTypesRequest, types: action.payload, isPending: false}}
        case REQUEST_EVENT_TYPES_FAILED:
            return {...state, eventTypesRequest:{...state.eventTypesRequest, error: action.payload, isPending: false}}
        default:
            return state;
    }
};

const initialStatePlacesQuery = {
    city: '',
    date: '',
    type: ''
};

export const placesQuery = (state = initialStatePlacesQuery, action = {}) => {
    switch(action.type){
        case SELECT_EVENT_CITY:
            return {...state, city: action.payload}
        case SELECT_EVENT_TYPE:
            return {...state, type: action.payload}
        case SELECT_EVENT_DATE:
            return {...state, date: action.payload}
        default:
            return state
    }
}