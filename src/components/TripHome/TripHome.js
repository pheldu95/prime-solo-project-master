import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripNav from '../TripNav/TripNav';

class TripHome extends Component {
   

    render() {
        
        return (

            <div>
                <TripNav/>
                Trip Home           
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(TripHome);