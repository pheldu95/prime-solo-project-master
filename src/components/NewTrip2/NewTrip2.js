import React, { Component } from 'react';
import { connect } from 'react-redux';
import EntryPoint from '../EntryPoint/EntryPoint'

class NewTrip2 extends Component {
    state = {
        //entry point #
        ep: {}
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
            ep: ep
        })
        console.log(this.state.ep);
                
    }
    

    render() {
        return (
            <div>
                <label>Entry Point</label>
                <select onChange={(event)=>this.handleChange(event)}>
                    {this.props.reduxState.entryPoints &&
                        this.props.reduxState.entryPoints.map((ep) => {
                            return(
                                <EntryPoint ep={ep}/>
                            )
                        })
                    }
                </select>
                
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(NewTrip2);