import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap3/dist/css/bootstrap.css';
import './index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {placesQuery,request} from './reducers/places_reducers';
import {requestEvents, newEvent} from "./reducers/events_reducers";
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({placesQuery,request,requestEvents, newEvent});
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
