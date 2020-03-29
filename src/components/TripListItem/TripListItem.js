import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, List } from 'semantic-ui-react'


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

    //temporaty fix for daye formatting
    let start_date = trip.start_date.substring(0, 10);
    let end_date = trip.end_date.substring(0, 10);
    return (
        
            <List.Item>
              <List.Content>
                <List.Header as='a' onClick={()=>this.goToTrip(trip)}>{trip.title}</List.Header>
                <List.Description>{start_date} to {end_date}</List.Description>
                {/* <Button basic color='light blue' content={trip.title} onClick={()=>this.goToTrip(trip)}/> */}
                <Button color='red' content='delete trip' onClick={()=>this.deleteTrip(trip.id)}/>
              </List.Content>
            </List.Item>
       
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TripListItem);