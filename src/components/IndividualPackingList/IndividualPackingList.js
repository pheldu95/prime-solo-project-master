import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripNav from '../TripNav/TripNav';
import PackingListItem from './PackingListItem';
import { Button, Icon, Table, Flag, Ref, Tab } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


class IndividualPackingList extends Component {
  

    render() {
        
        return (

            <div>
                <TripNav/>
                Packing List
                <ul>
                    {this.props.reduxState.packingList&&
                        this.props.reduxState.packingList.map((item) => {
                            return(
                                <PackingListItem item={item}/>
                            )
                        })
                    }
                
                </ul>
                {/* <DragDropContext onDragEnd={this.onDragEnd}>
                <Table singleLine>
                <Table.Header>
                <Table.Row>
                    {reorderEnabled && (<Table.HeaderCell />)}
                    < Table.HeaderCell> Name </Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Have</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Droppable droppableId="table">
                {(provided, snapshot) => (
                    <Ref innerRef={provided.innerRef}>
                    <Table.Body {...provided.droppableProps}>
                        {this.state.packingItems.map((packingItem, idx)=>{
                        return(
                            <Draggable draggableId={packingItem.id.toString()} index={idx} key = {packingItem.id}>
                            {(provided, snapshot) =>(
                                <Ref innerRef={provided.innerRef}>
                                <Table.Row
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={this.getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                    )}
                                    key={packingItem.id}
                                >
                                    
                                    <Table.Cell className="itemNameCell">
                                    {packingItem.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                    {packingItem.quantity}
                                    </Table.Cell>
                                    
                                </Table.Row>
                                </Ref>
                            )}
                            </Draggable>
                        )
                        })}
                    </Table.Body>
                    </Ref>
                )} 
                </Droppable>
            </Table>
            </DragDropContext> */}

            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(IndividualPackingList);