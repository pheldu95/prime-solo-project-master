import React, { Component } from 'react';
import {connect} from 'react-redux';

class Member extends Component {
  

  render() {
      //props coming from UserPage
    let member = this.props.member;
    return (
        <li>{member.first_name} {member.last_name} {member.age} {member.email}</li>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(Member);