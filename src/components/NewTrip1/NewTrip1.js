import React, { Component } from 'react';
import { connect } from 'react-redux';


class NewTrip1 extends Component {

    state = {
        startDate: '',
        endDate: '',
        difficulty: '',
        area: '',
        newMember:{
            firstName: '',
            lastName: '',
            age: 0,
            exercise: 0
        },
        members: []

    }
    //capture the changes made in the inputs
    inputChange = (event, type) =>{
        this.setState({
            [type]: event.target.value
        })        
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
        //go back to the home page
        this.props.history.push('/home');
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
                    <input onChange={(event)=>this.inputChange(event, 'startDate')} type= 'date'/>
                    <label>trip end date:</label>
                    <input onChange={(event)=>this.inputChange(event, 'endDate')} type = 'date'/>
                    <label>Trip Difficulty Level:</label>
                    <select onChange={(event)=>this.inputChange(event, 'difficulty')}>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                    <label>Approximate Outdoor Experience:</label>
                    <select onChange={(event)=>this.inputChange(event, 'experience')}>
                        <option>Our group is not very experienced in the outdoors</option>
                        <option>Our group has some experience in the outdoors</option>
                        <option>Our group is very experienced in the outdoors</option>
                    </select>
                    <br/>
                    <label>Which side of the BWCA would you like to go to?</label>
                    <select onChange={(event)=>this.inputChange(event, 'area')}>
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
                <input onChange={(event)=>this.memberInputsChange(event, 'firstName')} placeholder='first name'/>
                <input onChange={(event)=>this.memberInputsChange(event, 'lastName')} placeholder='last name'/>
                <input onChange={(event)=>this.memberInputsChange(event, 'age')} type='number' placeholder='age'/>
                <input onChange={(event)=>this.memberInputsChange(event, 'exercise')} type='number' style={{width:'220px'}} placeholder='average hours of exercise per week'/>
                <button onClick={this.addMember}>Add</button>
                <br/>
                <button onClick={this.cancelNewTrip}>Cancel</button>
                <button onClick={this.nextPage}>Next</button>
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(NewTrip1);