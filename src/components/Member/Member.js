import React, { Component } from 'react';
import {connect} from 'react-redux';

class Member extends Component {
  
  //remove the member from the trip_members table, with the corresponding member id
  removeMember = (id) =>{
    this.props.dispatch({type: 'REMOVE_MEMBER', payload: {member_id: id, trip_id: this.props.reduxState.trip.id}});
  }
  render() {
      //props coming from UserPage
    let member = this.props.member;
    return (
        <li>{member.first_name} {member.last_name} {member.age} {member.email} <button>edit</button> <button onClick={()=>this.removeMember(member.id)}>remove</button></li>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(Member);