import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntryPoint from '../EntryPoint/EntryPoint'
import Nav from '../Nav/Nav';

//require our group packing list  and member packing list finder function
let groupPackingListFinder = require('./groupPackingListFinder');
let memberPackingListFinder = require('./memberPackingListFinder');

class NewTrip2 extends Component {
    state = {
        //entry point #
        ep: this.props.reduxState.entryPoints[0],
        epReady: false,
        //entry points that will be suggested to the user based on difficulty level
        suggestedEps: []
    }
    componentDidMount(){
        this.setSuggestedEps();
        this.createMemberPackingList();
        this.createGroupPackingList();
    }
    
    //figure out the quantities for the items that each member will need, then send to db
    createMemberPackingList = () =>{
        
        //calculate the number of days the trip will last
        let trip = this.props.reduxState.pageOne;
        //convert them to dates that javascript can use
        let startDate = new Date(trip.startDate);
        let endDate = new Date(trip.endDate);
        //find the difference in time in miliseconds
        let differenceInTime = endDate.getTime() - startDate.getTime();
        //turn differenceInTime into days
        let days = differenceInTime/(1000*3600*24);
        
        let itemArray = memberPackingListFinder(days);
        
        this.props.dispatch({type: 'POST_MEMBER_ITEMS', payload: {itemArray: itemArray, trip_id: this.props.reduxState.trip.id}});
        
    }
    createGroupPackingList = () =>{
        //find how many members are on the trip
        let members = this.props.reduxState.pageOne.members.length;
        //find which packing list we need based on number of members
        //this function that we required will return an array of items based on # of members
        let groupPackingList = groupPackingListFinder(members);
        this.props.dispatch(
                                {
                                    type: 'POST_GROUP_ITEMS', 
                                    payload: 
                                        {
                                            itemArray: groupPackingList,
                                            trip_id: this.props.reduxState.trip.id
                                        }
                                }
                            )      
    }
    setSuggestedEps = () =>{
        //difficulty is the trip difficulty the user chose on the page before
        //it will be matched with any ep that has the same difficulty
       let difficulty = Number(this.props.reduxState.pageOne.difficulty);
       
       let epArray = this.props.reduxState.entryPoints;
       let suggestedEps = [] //the matched eps will be pushed to this array. then it will be set to suggestedEps in the state
       for(let i=0; i < epArray.length; i++){
           if(difficulty === epArray[i].difficulty){
               suggestedEps.push(epArray[i]);
           } 
       }
       console.log(suggestedEps);
       this.setState({
            suggestedEps: suggestedEps
       })
    }

    handleChange = (event) => {
        console.log(event.target.value);
        //parse the string that we got from ENtryPoint.js, turning it back into an object
        let ep = JSON.parse(event.target.value);
        this.setState({
            ep: ep,
            epReady: true
        })
        
                
    }

    //takes a link and then opens the link in a new window in the users browser
    moreInfo = (link) =>{
        window.open(`${link}`);
    }
    putPageOneData = () =>{
        //we will be updating the trip table with all of the info from page 1 of the new trip form
        let pageOne = this.props.reduxState.pageOne;
        pageOne.trip_id = this.props.reduxState.trip.id; //give the object the correct trip id. being stored in the reduxt store
        this.props.dispatch({
            type: 'PUT_PAGE_1_DATA',
            payload: pageOne
        });
        
        let members = pageOne.members;
        //loop through array of members, sending a dispatch for each one. posting to db
        //i did this to make sure all members are posted before the next page is loaded
        for(let i = 0; i<members.length; i++){
            this.props.dispatch({type: 'ADD_MEMBER', payload: {member: members[i], trip_id: pageOne.trip_id}});
        }

        //send promise back to submit function
        return Promise.resolve();
    }
    submit = () =>{
        //post the entry point
        this.props.dispatch({type: 'PUT_ENTRY_POINT', payload: {ep:this.state.ep.number, trip: this.props.reduxState.trip.id}})
        //wait until promise is recieved, then go to next page
        //this is because we want the db and reducers to be updated before we go to the next page, or else the reducers will be empty
        //on page Trip Hom page load, so there will be nothing to display
        this.putPageOneData().then(() => this.props.history.push('/tripHome'));
    }

    render() {
        let info;
        let moreInfoButton;
        //if there is an entry point in the state, then epReady will be true
        //if epReady is true, then info will be given a value of `Selected Entry Point: ${this.state.ep.number} ${this.state.ep.name}`
        //and the button will be displayed. the button will bring the user to the entry point web page
        if(this.state.epReady){
            info = `Selected Entry Point: ${this.state.ep.number} ${this.state.ep.name}`
            moreInfoButton = <button onClick={()=>this.moreInfo(this.state.ep.link)}>more information</button>
        }

        return (
            <div>
                <Nav/>
                <label>Entry Point</label>
                <select onChange={(event)=>this.handleChange(event)}>
                    {/* wait until this.props.reduxState.entryPoints exists, then do the mapping */}
                    {this.props.reduxState.entryPoints &&
                        this.props.reduxState.entryPoints.map((ep) => {
                            return(
                                <EntryPoint ep={ep}/>
                            )
                        })
                    }
                </select>
                <br/>
                <p>{info}</p>
                {moreInfoButton}
                <p>Suggested Entry Points (based on trip form page 1):</p>
                <ul>
                    {this.state.suggestedEps.map((ep)=>{
                        return(
                            <li>{ep.number} {ep.name} <button onClick={()=>this.moreInfo(ep.link)}>more information</button></li>
                        )
                    })}
                </ul>
                <button>back</button>
                <button onClick = {this.submit}>submit</button>             
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(NewTrip2);