import React from 'react';
import {FormControl} from 'react-bootstrap';

const EventTypeSelect = ({eventTypes, onEventTypeSelect,margin}) => {
   const options = eventTypes.map((eventType,i) => {
       return (
           <option value={eventType.nazwa} key={i}>{eventType.nazwa}</option>
       )
   });
   return (
    <FormControl componentClass="select" placeholder="select" onChange={onEventTypeSelect} style={ (margin)?{width: "60%"}:{}}>
        {options}
    </FormControl>
  )
}

export default EventTypeSelect;



