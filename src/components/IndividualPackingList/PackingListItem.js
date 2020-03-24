import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Draggable } from 'react-beautiful-dnd'
import { Button, Icon, Table, Flag, Ref, Checkbox } from 'semantic-ui-react'

class PackingListItem extends Component {
  state = {
      have : this.props.item.have
  }
  getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging && ("lightblue"),
    ...draggableStyle,
  })
  handleCheck = (have, id) =>{
      
      console.log(have);
      let newHaveValue = !have;
      this.props.dispatch({type: 'CHECK_ITEM', payload: {have: newHaveValue, item_id: id, trip_id: this.props.reduxState.trip.id}});

  }
  render() {
      //props coming from IndividualPackingList
    let item = this.props.item;
    let idx = this.props.idx
    return (
        <Draggable draggableId={item.id.toString()} index={idx} key = {item.id}>
            {(provided, snapshot) =>(
                <Ref innerRef={provided.innerRef}>
                <Table.Row
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={this.getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                    )}
                    key={item.id}
                >
                    
                    <Table.Cell className="itemNameCell">
                    {item.name}
                    </Table.Cell>
                    <Table.Cell>
                    {item.quantity}
                    </Table.Cell>
                     <Table.Cell>
                        <Checkbox checked={item.have} onChange = {()=>this.handleCheck(item.have, item.id)}/>
                    </Table.Cell>
                </Table.Row>
                </Ref>
            )}
        </Draggable>
    );
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});

export default connect(mapReduxStateToProps)(PackingListItem);