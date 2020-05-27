import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form, Select, Input } from "semantic-ui-react";

class MealCard extends Component {

    

    render() {
        let day = this.props.day;
        
        
        return (
            <Card raised style={{ width: '255px' }}>
                <Card.Content>
                    <Card.Header>Day Meals</Card.Header>
                    <Card.Description>
                        <li>Breakfast: </li>
                        <li>Lunch: </li>
                        <li>Dinner: </li>
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