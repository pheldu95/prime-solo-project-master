import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button } from 'semantic-ui-react'


class TripListItem extends Component {
  goToTrip = (trip)=>{
      //do i need to send it through a saga? here I am sending it straight to the tripReducer
      this.props.dispatch({type:'SET_TRIP', payload: trip})
      console.log(this.props);
      
      this.props.history.push('/tripHome');
      
  }
  deleteTrip = (id) =>{
    this.props.dispatch({type: 'DELETE_TRIP', payload: id})
  }
  render() {
      //props coming from UserPage
    let trip = this.props.trip;
    return (
        
            <li>
              <Button basic color='light blue' content={trip.title} onClick={()=>this.goToTrip(trip)}/>
              <Button color='red' content='delete trip' onClick={()=>this.deleteTrip(trip.id)}/>
            </li>
       
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TripListItem);