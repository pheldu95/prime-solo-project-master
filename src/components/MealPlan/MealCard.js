import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form, Select, Input } from "semantic-ui-react";
import './MealCard.css';

class MealCard extends Component {
    state = {
        fullView: false
    }

    //labels the meal with the correct string
    mealType = (meal) =>{
        if(meal == 1){
            return 'Breakfast: ';
        }else if(meal == 2) {
            return 'Lunch: ';
        } else if (meal == 3) {
            return 'Dinner: ';
        }
    }
    
    //toggle the fullView boolean in the state
    fullViewToggle = () =>{
        this.setState({
            fullView: !this.state.fullView
        })
        
    }

    render() {
        let day = this.props.day;
        
        return (
            <Card raised style={{ width: '255px', height: '100px'}} onClick={this.fullViewToggle}>
                <Card.Content>
                    <Card.Header>Day {day[0].day} Meals</Card.Header>
                        {this.state.fullView 
                            ? <Card.Description className="fullViewDiv">
                                {day.map((meal)=>{
                                    return(
                                       <div className="mealUl"> 
                                            <p>{this.mealType(meal.meal)} {meal.name}</p>
                                            <ul>
                                                {meal.ingredients.map((ingredient)=>{
                                                    return(
                                                        <li>
                                                            {ingredient.name}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            <Button size='mini'>Edit</Button>
                                        </div>
                                    )
                                })}
                            </Card.Description>
                            : <Card.Description>
                                {day.map((meal)=>{
                                    return(
                                        <p>
                                            {this.mealType(meal.meal)} {meal.name}
                                        </p>
                                    )
                                })}
                            </Card.Description>
                        }
                </Card.Content>
            </Card>
        );
    }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(MealCard);