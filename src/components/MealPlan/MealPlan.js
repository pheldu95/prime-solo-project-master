import React, { Component } from "react";
import { connect } from "react-redux";
import TripNav from "../TripNav/TripNav";
import { Button, Icon, Table, Flag, Ref, Tab } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from 'axios';

class MealPlan extends Component {
    

    render() {
        return (
            <div>
                <TripNav />
                
                <h3>Meal Planning</h3>
                
                
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(MealPlan);
