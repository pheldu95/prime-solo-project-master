import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripNav from '../TripNav/TripNav';
import Member from '../Member/Member';
import { Button, List, Input } from "semantic-ui-react";
import './TripHome.css'

//function we will use to calculate paddle info
import {paddleInfoCalculator} from './paddleInfoCalculator';
import axios from 'axios';

class TripHome extends Component {
    state = {
        //addMember is for conditional rendering
        addMember: false,
        editMode: false,
        newMember:{
            firstName: '',
            lastName: '',
            age: 0,
            email: ''
        },
        paddleInfo: '',
        entry_point: {},
    }
   componentDidMount(){
       this.getMembers();
       this.getAllPackingLists();
       this.calculatePaddleInfo();
       this.getEntryPointInfo();

   }

   //wait until the trip reducer has been updated with the entry point.
   //once it has, we can run getEntryPointInfo because we will have the entry point number
   componentDidUpdate = (prevProps) =>{
        if (this.props.reduxState.trip !== prevProps.reduxState.trip) {
            this.getEntryPointInfo();
        }
    }

   calculatePaddleInfo = () =>{
       let trip = this.props.reduxState.trip;
       let groupSize = this.props.reduxState.members.length;
       //calculate the number of days the trip will last
       //convert them to dates that javascript can use
       let start_date = new Date(trip.start_date);
       let end_date = new Date(trip.end_date);
       //find the difference in time in miliseconds
       let differenceInTime = end_date.getTime() - start_date.getTime();
       //turn differenceInTime into days
       let days = differenceInTime / (1000 * 3600 * 24);
       console.log('days', days);

       let paddleInfo = paddleInfoCalculator(trip, groupSize, days);
       console.log('paddleInfo', paddleInfo);
       this.setState({
           paddleInfo: paddleInfo
       })


       
   }
   getMembers = () =>{
       //this dispatch will go to allTripsSaga. where axios will get members of the trip
       this.props.dispatch({type: 'GET_MEMBERS', payload: this.props.reduxState.trip.id});
   }
   getAllPackingLists = () =>{
        let trip_id = this.props.reduxState.trip.id;
        this.props.dispatch({type: 'GET_PACKING_LIST', payload: trip_id});
        this.props.dispatch({type:'GET_GROUP_PACKING_LIST', payload: trip_id});

    }
    getEntryPointInfo = () =>{
        let ep_number = this.props.reduxState.trip.entry_point;
        console.log('getting ep', ep_number);
        
        axios({
            method: 'GET',
            url: `/api/entryPoints/${ep_number}`
        }).then((response) =>{
            console.log('ep info back from db', response.data);
            //if we dont have this conditional, it will 
            //error out when this function run in componentDidMount
            //because the trip redux state might not have the entry point number yet
            if(response.data[0] != undefined){
                this.setState({
                    entry_point: response.data[0]
                    
                })
            }
        }).catch((error)=>{
            console.log('error getting ep', error);
            
        })
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
        let ep = this.state.entry_point;
        let trip = this.props.reduxState.trip
        //conditional rendering
        //if addMember is false, the dom will just have a button asking if the user wants to add a member
        //if the user clicks this button, it will run toggleAddMember, which turns the variable addMember
        //into a div with all of the inputs
        //pressing cancel toggles it back to the "add member?" button
        let addMember
        if(this.state.addMember === false){
            addMember = <Button onClick = {this.toggleAddMember}>Add member?</Button>
        }else if(this.state.addMember === true){
            addMember = <div ><Input size='mini' onChange={(event)=>this.memberInputsChange(event, 'firstName')} placeholder='first name'/>
                <Input size='mini' onChange={(event)=>this.memberInputsChange(event, 'lastName')} placeholder='last name'/>
                <Input size='mini' onChange={(event)=>this.memberInputsChange(event, 'age')} type='number' placeholder='age'/>
                <Input size='mini' onChange={(event)=>this.memberInputsChange(event, 'email')} placeholder='email'/>
                <Button onClick={this.addMember}>Add</Button>
                <Button onClick={()=> this.setState({addMember: false})}>Cancel</Button>
                </div>
        }
        // let start_date = trip.start_date.substring(0, 10);
        // let end_date = trip.end_date.substring(0, 10);
        return (
            <div className="tripHome">
                <TripNav/>
                <div className="tripHomeContent">
                    <div style={{display: "flex"}}>
                        <h3>Trip Info</h3> <Button style={{marginLeft:'20px'}} content='edit' />
                    </div>
                    <hr classNam="default_hr"></hr>
                    {/* will wait until the dates are not null, then appear on DOM */}
                    {this.props.reduxState.trip.start_date != null&&
                        <p>
                            Trip start: {trip.start_date.substring(0, 10)}
                            <br/>
                            Trip end: {trip.end_date.substring(0, 10)}
                        </p>
                    }
                    <p>
                        Entry Point: {ep.number} -- {ep.name}   
                    </p>
                    {this.state.paddleInfo&&
                        <p>Estimated distance per day: 9 miles</p>  
                        //{this.state.paddleInfo.distance}
                    }
                    <h3>Trip Members</h3>
                    <List relaxed>
                        {this.props.reduxState.members&&
                            this.props.reduxState.members.map((member) => {
                                return(
                                    <Member member={member}/>
                                )
                            })
                        }
                        {addMember}
                    </List>     
                </div>      
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(TripHome);