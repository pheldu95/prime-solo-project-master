import React, { Component } from 'react';
import {connect} from 'react-redux';

class TripListItem extends Component {
  

  render() {
      //props coming from UserPage
    let trip = this.props.trip;
    return (
        <li>{trip.title}</li>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(TripListItem);