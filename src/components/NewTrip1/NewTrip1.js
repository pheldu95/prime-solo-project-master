import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';


class NewTrip1 extends Component {

    state = {
        title: '',
        userId: this.props.reduxState.user.id,
        startDate: '',
        endDate: '',
        difficulty: 1,
        experience: 1,
        area: 'either',
        newMember:{
            firstName: '',
            lastName: '',
            age: 0,
            exercise: 0
        },
        members: []

//the trip id is held in tripReducer so we dont need it in the local state

    }
    
    
    printRedux = () =>{
        console.log(this.state.trip_id);
        
    }
    //capture the changes made in the inputs
    inputChange = (event, type) =>{
        this.setState({
            [type]: event.target.value
        })        
        console.log(event.target.value);
        console.log(this.state);
        
    }
    //capture changes made in new member form
    memberInputsChange = (event, type) =>{
        this.setState({
            newMember:{
                ...this.state.newMember,
                [type]: event.target.value
            }
        })    
    }
    //adds the new member to the area in the state
    addMember = () =>{
        this.setState({
            members: [...this.state.members, this.state.newMember]
        })
    }
    cancelNewTrip=()=>{
        //send dispatch to delete trip entry from table
        this.props.dispatch({type: 'DELETE_NEW_TRIP', payload: this.state.trip_id});
        //go back to the home page
        this.props.history.push('/home');
    }
    nextPage=()=>{
        //send the state to redux so it can be posted to the db
        let pageOneData = this.state
        //give the object the trip_id
        pageOneData.trip_id = this.props.reduxState.trip
        this.props.dispatch({type:'PAGE_1_DATA', payload: pageOneData});
        //go to the next page of the new trip form
        // this.props.history.push('/newtrip2');
    }
    render() {
        return (
            <div>
                <h3>New Trip</h3>
                <p>step 1/2</p>
                {/* <p>{this.state.trip_id}</p> */}
                <form>
                    <label>Trip title:</label>
                    <input onChange={(event)=>this.inputChange(event, 'title')} placeholder='title'/>
                    <br/>
                    <label>trip start date:</label>
                    <input onChange={(event)=>this.inputChange(event, 'startDate')} type= 'date'/>
                    <label>trip end date:</label>
                    <input onChange={(event)=>this.inputChange(event, 'endDate')} type = 'date'/>
                    <label>Trip Difficulty Level:</label>
                    <select onChange={(event)=>this.inputChange(event, 'difficulty')}>
                        <option value={1}>Beginner</option>
                        <option value={2}>Intermediate</option>
                        <option value={3}>Advanced</option>
                    </select>
                    <label>Approximate Outdoor Experience:</label>
                    <select onChange={(event)=>this.inputChange(event, 'experience')}>
                        <option value={1}>Our group is not very experienced in the outdoors</option>
                        <option value={2}>Our group has some experience in the outdoors</option>
                        <option value={3}>Our group is very experienced in the outdoors</option>
                    </select>
                    <br/>
                    <label>Which side of the BWCA would you like to go to?</label>
                    <select onChange={(event)=>this.inputChange(event, 'area')}>
                        <option value='either'>Either</option>
                        <option value='east'>East</option>
                        <option value='west'>West</option>
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
                <input onChange={(event)=>this.memberInputsChange(event, 'firstName')} placeholder='first name'/>
                <input onChange={(event)=>this.memberInputsChange(event, 'lastName')} placeholder='last name'/>
                <input onChange={(event)=>this.memberInputsChange(event, 'age')} type='number' placeholder='age'/>
                <input onChange={(event)=>this.memberInputsChange(event, 'exercise')} type='number' style={{width:'220px'}} placeholder='average hours of exercise per week'/>
                <button onClick={this.addMember}>Add</button>
                <br/>
                <button onClick={this.cancelNewTrip}>Cancel</button>
                <button onClick={this.nextPage}>Next</button>
                <button onClick={this.printRedux}>help</button>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(NewTrip1);