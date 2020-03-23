import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripNav from '../TripNav/TripNav';
import PackingListItem from './PackingListItem';

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
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(IndividualPackingList);