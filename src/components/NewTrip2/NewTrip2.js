import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntryPoint from '../EntryPoint/EntryPoint'


class NewTrip2 extends Component {
    state = {
        //entry point #
        ep: {},
        epReady: false,
        //entry points that will be suggested to the user based on difficulty level
        suggestedEps: []
    }
    componentDidMount = () =>{
       
    }

    //this function will wait for props to update
    componentDidUpdate(prevProps){
        console.log('here is prevProps', prevProps.reduxState.trip);
        console.log('here is current trip', this.props.reduxState.trip);
        //if our previous tripReducer is different than the current one, then we will run 
        //setSuggestedEps
        //this will make sure we have the difficulty level available before we run setSuggestedEps
        if(prevProps.reduxState.trip !== this.props.reduxState.trip)
        { 
            this.setSuggestedEps();
        }
    }
    setSuggestedEps = () =>{
        //difficulty is the trip difficulty the user chose on the page before
        //it will be matched with any ep that has the same difficulty
       let difficulty = this.props.reduxState.trip.difficulty;
       let epArray = this.props.reduxState.entryPoints;
       let suggestedEps = [] //the matched eps will be pushed to this array. then it will be set to suggestedEps in the state
       for(let i=0; i < epArray.length; i++){
           if(difficulty === epArray[i].difficulty){
               console.log(epArray[i]);
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
    moreInfo = (link) =>{
        window.open(`${link}`);
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
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(NewTrip2);