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

const initialStateEvents = {
  eventsRequest: {
    isPending: false,
    events: [],
    error: ""
  },
  newEvent:{
    isPending: false,
    redirect: false,
    error: ""
  }
};

export const requestEvents = (state = initialStateEvents, action = {}) => {
  switch (action.type) {
    case REQUEST_EVENTS_PENDING:
      return { ...state, eventsRequest: { ...state.eventsRequest, isPending: true } };
    case REQUEST_EVENTS_SUCCESS:
    console.log(action.payload)
      return {
        ...state,
        eventsRequest: { ...state.eventsRequest, isPending: false, events: action.payload }
      };
    case REQUEST_EVENTS_FAILED:
      return {
        ...state,
        eventsRequest: { ...state.eventsRequest, isPending: false, error: action.payload }
      };
    case REQUEST_EVENT_CREATE_PENDING:
      return{
          ...state,
          newEvent: {...state.newEvent, isPending: true}};
    case REQUEST_EVENT_CREATE_SUCCESS:
        return {
            ...state,
            eventsRequest: {...state.eventsRequest, events: [...state.eventsRequest.events, action.payload]},
            newEvent: {...state.newEvent, isPeding: false, redirect: true}
        };
    case REQUEST_EVENT_CREATE_FAILED: 
    return {
        ...state,
        newEvent: {...state.newEvent, isPeding: false, error: action.payload}
    };
    case RESTORE_EVENT_CREATE:
    return {
        ...state,
        newEvent: {...state.newEvent, redirect: action.payload}
    }
    default:
      return state;
  }
};

const initialStateNewEvent = {
    name: '',
    type: '',
    date: ''
};

export const newEvent = (state = initialStateNewEvent, action = {}) => {
    switch(action.type){
        case SELECT_EVENT_NAME:
            return {...state,  name: action.payload}
        case SELECT_EVENT_TYPE:
            return {...state, type: action.payload}
        case SELECT_EVENT_DATE:
            return {...state, date: action.payload}
        default:
            return state;
    }
}
