import React, { Component } from 'react';
import { connect } from 'react-redux';


class NewTrip2 extends Component {

   

    render() {
        return (
            <div>
                New Trip 2
                
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(NewTrip2);