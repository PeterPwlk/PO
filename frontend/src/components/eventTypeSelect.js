import React from 'react';
import {FormControl} from 'react-bootstrap';

const EventTypeSelect = ({eventTypes, onEventTypeSelect}) => {
   const options = eventTypes.map((eventType,i) => {
       return (
           <option value={eventType.nazwa} key={i}>{eventType.nazwa}</option>
       )
   });
   return (
    <FormControl componentClass="select" placeholder="select" onChange={onEventTypeSelect} style={{width: "60%"}}>
        {options}
    </FormControl>
  )
}

export default EventTypeSelect;



