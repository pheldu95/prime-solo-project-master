import React, { Component } from 'react';
import { connect } from 'react-redux';


class NewTrip1 extends Component {

    state = {
        dates: {
            start: '',
            end: ''
        },
        members: [],

    }
   
    nextPage=()=>{
        //go to the next page of the new trip form
        this.props.history.push('/newtrip2');
    }
    render() {
        return (
            <div>
                <h3>New Trip</h3>
                <p>step 1/2</p>
                <form>
                    <label>trip start date:</label>
                    <input type= 'date'/>
                    <label>trip end date:</label>
                    <input type = 'date'/>
                    <label>Trip Difficulty Level:</label>
                    <select>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                    <label>Approximate Outdoor Experience:</label>
                    <select>
                        <option>Our group is not very experienced in the outdoors</option>
                        <option>Our group has some experience in the outdoors</option>
                        <option>Our group is very experienced in the outdoors</option>
                    </select>
                    <br/>
                    <label>Which side of the BWCA would you like to go to?</label>
                    <select>
                        <option>East</option>
                        <option>West</option>
                    </select>
                </form>
                <h3>Members</h3>
                <ul>
                    {this.state.members.map((member)=>{
                        return(
                            <li>{member.firstName} {member.lastName} {member.age}</li>
                        )
                    })}
                </ul>
                <input placeholder='first name'/>
                <input placeholder='last name'/>
                <input type='number' placeholder='age'/>
                <input type='number' style={{width:'220px'}} placeholder='average hours of excersize per week'/>
                <button>Add</button>
                <br/>
                <button onClick={this.nextPage}>Next</button>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(NewTrip1);