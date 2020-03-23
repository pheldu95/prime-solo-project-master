import React, { Component } from 'react';
import {connect} from 'react-redux';

class PackingListItem extends Component {
  

  render() {
      //props coming from IndividualPackingList
    let item = this.props.item;
    return (
        <li>{item.name} {item.quantity}</li>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(PackingListItem);