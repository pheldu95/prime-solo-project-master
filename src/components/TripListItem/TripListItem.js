import React, { Component } from 'react';
import {connect} from 'react-redux';

class TripListItem extends Component {
  goToTrip = (trip)=>{
      //do i need to send it through a saga? here I am sending it straight to the tripReducer
      this.props.dispatch({type:'SET_TRIP', payload: trip})
      console.log(this.props);
      
      this.props.history.push('/tripHome');
      
  }

  render() {
      //props coming from UserPage
    let trip = this.props.trip;
    return (
        <li onClick={()=>this.goToTrip(trip)}>{trip.title}, {trip.id}</li>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TripListItem);