import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripNav from '../TripNav/TripNav';
import Member from '../Member/Member';

class TripHome extends Component {
   componentDidMount(){
       this.getMembers();
   }
   getMembers = () =>{
       //this dispatch will go to allTripsSaga. where axios will get members of the trip
       this.props.dispatch({type: 'GET_MEMBERS', payload: this.props.reduxState.trip.id});
   }

    render() {
        
        return (

            <div>
                <TripNav/>
                Trip Home
                <ul>
                    {this.props.reduxState.members&&
                        this.props.reduxState.members.map((member) => {
                            return(
                                <Member member={member}/>
                            )
                        })
                    }
                
                </ul>           
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(TripHome);