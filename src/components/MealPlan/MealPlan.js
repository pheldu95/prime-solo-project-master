import React, { Component } from "react";
import { connect } from "react-redux";
import TripNav from "../TripNav/TripNav";
import { Button, Card } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from 'axios';

class MealPlan extends Component {
    state = [
        {
            breakfast: {
                name: 'oatmeal',
                ingredients : ['oats', 'peanut butter', 'brown sugar'],
                day: 1,
                meal: 1
            },
            lunch : {
                name: 'sandwiches and gorp',
                ingredients: ['bread', 'peanut butter', 'gorp'],
                day: 1,
                meal: 2
            },
            dinner : {
                name: 'tacos',
                ingredients: ['torillas', 'cheese', 'hot sauce', 'rice', 'beans'],
                day: 1,
                meal: 3
            }
        },
        {
            breakfast: {
                name: 'oatmeal',
                ingredients: ['oats', 'peanut butter', 'brown sugar'],
                day: 2,
                meal: 1
            },
            lunch : {
                name: 'sandwiches and gorp',
                ingredients: ['bread', 'peanut butter', 'gorp'],
                day: 2,
                meal: 2
            },
            dinner : {
                name: 'ramen',
                ingredients: ['ramen packet', 'hot sauce'],
                day: 2,
                meal: 3
            }
        }
    ]
    
    render() {
        
        return (
            <div>
                <TripNav />
                
                <h3>Meal Planning</h3>
                <Card.Group>
                    {this.state.map((day)=>{
                        return(
                            <Card>
                                <Card.Content>
                                    <Card.Header>Day {day.breakfast.day} Meals</Card.Header>
                                    <Card.Description>
                                        <li>Breakfast: {day.breakfast.name}</li>
                                        <li>Lunch: {day.lunch.name}</li>
                                        <li>Dinner: {day.dinner.name}</li>
                                    </Card.Description>
                                    {/* <Card.Description>{day.breakfast.ingredients.map((ingredient)=>{
                                        return(
                                            <li>{ingredient}</li>
                                        )
                                    })}</Card.Description> */}
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(MealPlan);
