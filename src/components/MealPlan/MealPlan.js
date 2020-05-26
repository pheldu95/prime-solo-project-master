import React, { Component } from "react";
import { connect } from "react-redux";
import TripNav from "../TripNav/TripNav";
import { Button, Card, Form, Select, Input } from "semantic-ui-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from 'axios';

class MealPlan extends Component {
    state = {
        addMealToggle: false,
        addIngredientToggle: false,
        newMeal:{
            name:'',
            meal: 1,
            ingredients: [],
            day: 1
        },
        newIngredient: '',
        meals: [
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
            },
            {
                breakfast: {
                    name: 'oatmeal',
                    ingredients: ['oats', 'peanut butter', 'brown sugar'],
                    day: 3,
                    meal: 1
                },
                lunch: {
                    name: 'sandwiches and gorp',
                    ingredients: ['bread', 'peanut butter', 'gorp'],
                    day: 3,
                    meal: 2
                },
                dinner: {
                    name: 'ramen',
                    ingredients: ['ramen packet', 'hot sauce'],
                    day: 3,
                    meal: 3
                }
            }
        ]
    }
    addMeal = () =>{
        this.props.dispatch({type: 'ADD_MEAL', payload: {newMeal: this.state.newMeal, trip_id: this.props.reduxState.trip.id}})
        
    }
    addIngredient = () =>{
       this.setState({
           newMeal:{
               ...this.state.newMeal,
               ingredients: [...this.state.newMeal.ingredients, this.state.newIngredient]
           }
       })       
        
    }
    addMealToggle = () => {        
        this.setState({
            addMealToggle: !this.state.addMealToggle
        });
    };
    addIngredientToggle = () => {
        this.setState({
            addIngredientToggle: !this.state.addIngredientToggle
        });
    };
    handleNewMealChange = (event, type) =>{
        this.setState({
            newMeal:{
                ...this.state.newMeal,
                [type]: event.target.value
            }
        })
    }
    //why does this only work if I pass event? even though I'm not using event
    handleMealSelectChange = (event, {value}) =>{        
        this.setState({
            newMeal:{
                ...this.state.newMeal,
                meal: value
            }
        })
    }
    handleDaySelectChange = (event, { value }) => {
        this.setState({
            newMeal: {
                ...this.state.newMeal,
                day: value
            }
        })
    }
    handleIngredientChange = (event) =>{
        this.setState({
            newIngredient: event.target.value
        })
        console.log(this.state.newIngredient);
        
    }
    render() {
        let addMeal;
        const mealOptions = [
            {key: 'breakfast', text: 'Breakfast', value: 1},
            { key: 'lunch', text: 'Lunch', value: 2 },
            { key: 'dinner', text: 'Dinner', value: 3 }

        ]

        //creating array of objects for our day select to use
        let days = this.props.reduxState.days;
        let daysArray = [];
        for(let i = 0; i < days; i++){
            let day = { key: `day ${i + 1}`, text: `Day ${i + 1}`, value: i + 1 }
            daysArray.push(day)
        }
        const dayOptions = daysArray;
        if (!this.state.addMealToggle){
            addMeal = <Button color="light green" content="+" onClick={this.addMealToggle} />;
        }else{
            addMeal = <div>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    id='form-input-control-meal-name'
                                    control={Input}
                                    label='Meal Name'
                                    placeholder='Meal Name'
                                    onChange={event=>this.handleNewMealChange(event, 'name')}
                                />
                                <Form.Field
                                    control={Select}
                                    options={mealOptions}
                                    label={{ children: 'Meal', htmlFor: 'form-select-control-meal' }}
                                    placeholder='Meal'
                                    onChange={this.handleMealSelectChange}
                                />
                                <Form.Field
                                    control={Select}
                                    options={dayOptions}
                                    label={{ children: 'Days', htmlFor: 'form-select-control-day' }}
                                    placeholder='Day'
                                    onChange={this.handleDaySelectChange}
                                />
                            </Form.Group>
                            <h3>Ingredients</h3>
                            <Form.Group widths='equal'>
                                {this.state.addIngredientToggle
                                    ? 
                                        <div>
                                            <Form.Field
                                                id='form-input-control-ingredient'
                                                control={Input}
                                                label='Ingredient'
                                                placeholder='Ingredient'
                                                onChange={event=>this.handleIngredientChange(event)}
                                            />
                                            <Button color="light green" content="Add" onClick={this.addIngredient}/>
                                            <Button color="red" content="Cancel" onClick={this.addIngredientToggle} />
                                        </div>
                                    : <Button color="light green" content="Add Ingredient" onClick={this.addIngredientToggle} />

                                }
                            </Form.Group>
                        </Form>
                        <Button color="light green" content="Add Meal to Trip" onClick={this.addMeal} />
                        <Button color="red" content="Cancel" onClick={this.addMealToggle} />
                    </div>
        }
        return (
            <div>
                <TripNav />
                
                <h3>Meal Planning</h3>
                <Card.Group>
                    {this.state.meals.map((day)=>{
                        return(
                            <Card raised style={{width:'255px'}}> 
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
                {addMeal}
            </div>
        );
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(MealPlan);
