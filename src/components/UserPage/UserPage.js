import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import TripListItem from '../TripListItem/TripListItem';
import Nav from '../Nav/Nav';


// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component{
  
  componentDidMount = () =>{
    this.getAllTrips();
    //get all the entry points and put them in the entrypointsReducer. for later use
    this.getEntryPoints();

    //give the pageOneReducer some initial values. so that pageOneReducer isnt undefined
    this.props.dispatch({type: 'HOLD_PAGE_1', payload: {title: '',
               startDate: '0001-01-01',
               endDate: '0001-01-01',
               difficulty: 1,
               experience: 1,
               area: 'either',
               members: []}});
  }

  //get the user's trips
  getAllTrips = () =>{
    this.props.dispatch({type: 'GET_ALL_TRIPS'});
  }

  //dispatch to entryPointSaga to get all entry points for entryPointsReducer
  getEntryPoints = () =>{
        this.props.dispatch({type: 'GET_ENTRY_POINTS'})
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
        <Nav/>
        <h1 id="welcome">
          Welcome, { this.props.user.username }!
        </h1>
        <div>
          <h1>Trips</h1>
          <ul>
          {/* here we will map the trips array coming from the database */}
            {this.props.state.allTrips.map((trip) =>{
              return(
                // pass it the trip and history. 
                //need to pass it history so it can do a this.props.history.push
                //or else history is undefined
                <TripListItem trip={trip} history={this.props.history}/>
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
