import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripNav from '../TripNav/TripNav';
import PackingListItem from './PackingListItem';
import { Button, Icon, Table, Flag, Ref, Tab } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


class IndividualPackingList extends Component {
  constructor(props) {
    super(props)
    this.state = {
       packingItems: this.props.reduxState.packingList,
      reorderEnabled: false,
      selectedRowIds: [],
      draggingRowId: null
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  
  onDragEnd = result => {
    const { destination, source, reason } = result;

    if (!destination || reason === 'CANCEL') {
      this.setState({
        draggingRowId: null,
      });
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const packingItems = Object.assign([], this.state.packingItems);
    const packingItem = this.state.packingItems[source.index];
    packingItems.splice(source.index, 1);
    packingItems.splice(destination.index, 0, packingItem);

    console.log('id of item dragged:', packingItem.id);
    
    //where the dragged item is ending up
    console.log('destination.index:', destination.index);
    
    let itemInfo = {idOfDraggedItem: packingItem.id, indexOfDestination: destination.index}
    this.props.dispatch({type: 'DRAG_ITEM', payload: itemInfo});
    this.setState({
      packingItems
    });
  }

    render() {
        const { packingItems, selectedRowIds, reorderEnabled } = this.state;

        return (

            <div>
                <TripNav/>
                Packing List
                <DragDropContext onDragEnd={this.onDragEnd}>
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
                                    {this.props.reduxState.packingList&&
                                        this.props.reduxState.packingList.map((item, idx)=>{
                                            return(
                                                <PackingListItem item={item} idx = {idx}/>
                                            )
                                        })
                                    }
                                </Table.Body>
                                </Ref>
                            )} 
                            </Droppable>
                    </Table>
                </DragDropContext>

            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(IndividualPackingList);