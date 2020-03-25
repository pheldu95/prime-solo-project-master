import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripNav from '../TripNav/TripNav';
import Member from '../Member/Member';

class TripHome extends Component {
    state = {
        //addMember is for conditional rendering
        addMember: false,
         newMember:{
            firstName: '',
            lastName: '',
            age: 0,
            exercise: 0,
            email: ''
        },
    }
   componentDidMount(){
       this.getMembers();
       this.getAllPackingLists();
   }
   getMembers = () =>{
       //this dispatch will go to allTripsSaga. where axios will get members of the trip
       this.props.dispatch({type: 'GET_MEMBERS', payload: this.props.reduxState.trip.id});
   }
   getAllPackingLists = () =>{
        let trip_id = this.props.reduxState.trip.id;
        this.props.dispatch({type: 'GET_PACKING_LIST', payload: trip_id});
        this.props.dispatch({type:'GET_GROUP_PACKING_LIST', payload: trip_id});
        this.props.dispatch({type: 'GET_RENTALS', payload: trip_id});

    }
  
   toggleAddMember = () =>{
       if(this.state.addMember === false){
           this.setState({
               addMember: true
           })
       }else if(this.state.addMember === true){
           this.setState({
               addMember: false
           })
       }
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
    
    addMember = () => {
        this.props.dispatch({type: 'ADD_MEMBER', payload: {member: this.state.newMember, trip_id: this.props.reduxState.trip.id}})
        this.setState({
            addMember: false
        })
    }
    render() {
        //conditional rendering
        //if addMember is false, the dom will just have a button asking if the user wants to add a member
        //if the user clicks this button, it will run toggleAddMember, which turns the variable addMember
        //into a div with all of the inputs
        //pressing cancel toggles it back to the "add member?" button
        let addMember
        if(this.state.addMember === false){
            addMember = <button onClick = {this.toggleAddMember}>add member?</button>
        }else if(this.state.addMember === true){
            addMember = <div><input onChange={(event)=>this.memberInputsChange(event, 'firstName')} placeholder='first name'/>
                <input onChange={(event)=>this.memberInputsChange(event, 'lastName')} placeholder='last name'/>
                <input onChange={(event)=>this.memberInputsChange(event, 'age')} type='number' placeholder='age'/>
                <input onChange={(event)=>this.memberInputsChange(event, 'exercise')} type='number' style={{width:'220px'}} placeholder='average hours of exercise per week'/>
                <input onChange={(event)=>this.memberInputsChange(event, 'email')} placeholder='email'/>
                <button onClick={()=> this.setState({addMember: false})}>Cancel</button>
                <button onClick={this.addMember}>Add</button></div>
        }
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
                    {addMember}
                </ul>           
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(TripHome);