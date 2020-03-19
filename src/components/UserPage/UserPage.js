import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import TripListItem from '../TripListItem/TripListItem';



// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component{
  
  
  componentDidMount = () =>{
    this.getAllTrips();
  }

  //get the user's trips
  getAllTrips = () =>{
    this.props.dispatch({type: 'GET_ALL_TRIPS'});
  }

  //need to have the new trip already created when the user gets to new trip page 1.
  //that way, the trip id will already be available so the member table can use it for the reference column
  newTrip = () =>{
    console.log('new trip');
    this.props.dispatch({type: 'CREATE_TRIP', payload: this.props.user.id});
    this.props.history.push('/newtrip1');
  }
  render(){
    
    return(
      <div>
        <h1 id="welcome">
          Welcome, { this.props.user.username }!
        </h1>
        <div>
          <h1>Trips</h1>
          <ul>
          {/* here we will map the trips array coming from the database */}
            {this.props.state.allTrips.map((trip) =>{
              return(
                <TripListItem trip={trip}/>
              )
            })}
          </ul>
          <button onClick={this.newTrip}>Create New Trip</button>
        </div>
        
        <p>Your ID is: {this.props.user.id}</p>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.user,
  state

});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
