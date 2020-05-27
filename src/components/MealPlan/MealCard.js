import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form, Select, Input } from "semantic-ui-react";

class MealCard extends Component {

    mealType = (meal) =>{
        if(meal == 1){
            return 'Breakfast: ';
        }else if(meal == 2) {
            return 'Lunch: ';
        } else if (meal == 3) {
            return 'Dinner: ';
        }
    }
    

    render() {
        let day = this.props.day;
        
        
        return (
            <Card raised style={{ width: '255px' }}>
                <Card.Content>
                    <Card.Header>Day {day[0].day} Meals</Card.Header>
                    <Card.Description>
                        {day.map((meal)=>{
                            return(
                                <li>
                                    {this.mealType(meal.meal)} {meal.name}
                                </li>
                            )
                        })}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(MealCard);