import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntryPoint from '../EntryPoint/EntryPoint'


class NewTrip2 extends Component {
    state = {
        //entry point #
        ep: {},
        epReady: false
    }
    componentDidMount = () =>{
        this.getEntryPoints();
    }
    getEntryPoints = () =>{
        this.props.dispatch({type: 'GET_ENTRY_POINTS'})
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
    moreInfo = () =>{
        window.open(`${this.state.ep.link}`);
    }
    

    render() {
        let info;
        let moreInfoButton;
        //if there is an entry point in the state, then epReady will be true
        //if epReady is true, then info will be given a value of `Selected Entry Point: ${this.state.ep.number} ${this.state.ep.name}`
        //and the button will be displayed. the button will bring the user to the entry point web page
        if(this.state.epReady){
            info = `Selected Entry Point: ${this.state.ep.number} ${this.state.ep.name}`
            moreInfoButton = <button onClick={this.moreInfo}>more information</button>
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
                              
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(NewTrip2);