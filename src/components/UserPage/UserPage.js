import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';


// const newTrip = (props) =>{
//   console.log(props);
  
//   this.props.history.push('/newtrip1');
  
// }

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component{
  state ={
    trips : ['Trip 1', 'Trip 2', 'Trip3']
  }
  newTrip = () =>{
    console.log('new trip');
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
            {this.state.trips.map((trip) =>{
              return(
                <li>{trip}</li>
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

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
