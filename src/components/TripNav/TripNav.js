import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './TripNav.css';


class Nav extends Component {
  state = {
    activeTab: ''
  }
  setActive = (tab) => {
    this.setState({
      activeTab: tab
    });
  }
  render() {
    let activeTab = this.state.activeTab;
    if (window.location === '/home') {
      console.log('asdsasdsasadasdasdassdadsadasdas');

    }
    return (
      <div id='cssmenu'>
        <Link onClick={() => this.setActive('home')} className="navLink" to="/tripHome">
          <h2 className="nav-title">{this.props.state.trip.title}</h2>
        </Link>
        <ul>
          {activeTab === 'home'
            ? <li class='active'><a href='#'>
              <Link onClick={() => this.setActive('home')} className="navLink" to="/home">Home</Link>
            </a></li>
            : <li><a href='#'>
              <Link onClick={() => this.setActive('home')} className="navLink" to="/home">Home</Link>
            </a></li>
          }
          {this.props.user.id && (
            <>
              {activeTab === 'tripInfo'
                ? <li class='active'><a href='#'>
                  <Link onClick={() => this.setActive('tripInfo')} className="navLink" to="/tripHome">Trip Info</Link>
                </a></li>
                : <li><a href='#'>
                  <Link onClick={() => this.setActive('tripInfo')} className="navLink" to="/tripHome">Trip Info</Link>
                </a></li>
              }

              {activeTab === 'packingList'
                ? <li class='active'><a href='#'>
                  <Link onClick={() => this.setActive('packingList')} className="navLink" to="/packingList">Member Packing List</Link>
                </a></li>
                : <li><a href='#'>
                  <Link onClick={() => this.setActive('packingList')} className="navLink" to="/packingList"> Member Packing List</Link>
                </a></li>
              }

              {activeTab === 'groupPackingList'
                ? <li class='active'><a href='#'>
                  <Link onClick={() => this.setActive('groupPackingList')} className="navLink" to="/groupPackingList">Group Packing List</Link>
                </a></li>
                : <li><a href='#'>
                  <Link onClick={() => this.setActive('groupPackingList')} className="navLink" to="/groupPackingList">Group Packing List</Link>
                </a></li>
              }

              {activeTab === 'outfitters'
                ? <li class='active'><a href='#'>
                  <Link onClick={() => this.setActive('outfitters')} className="navLink" to="/outfitters">Outfitters</Link>
                </a></li>
                : <li><a href='#'>
                  <Link onClick={() => this.setActive('outfitters')} className="navLink" to="/outfitters">Outfitters</Link>
                </a></li>
              }
              <li><a href='#'>
                <LogOutButton onClick={() => this.setActive('')} className="navLink" onClick={() => window.location.reload(false)} />
              </a></li>
            </>
          )}
        </ul>
      </div>
    )
  }
}
// const Nav = (props) => (
  
  // <div className="nav">
  //   <Link to="/tripHome">
  //     <h2 className="nav-title">{props.state.trip.title}</h2>
  //   </Link>
  //   <div className="nav-right">
  //     <Link className="nav-link" to="/home">
  //       {/* Show this link if they are logged in or not,
  //       but call this link 'Home' if they are logged in,
  //       and call this link 'Login / Register' if they are not */}
  //       {props.user.id ? 'Home' : 'Login / Register'}
  //     </Link>
  //     {/* Show the link to the info page and the logout button if the user is logged in */}
  //     {props.user.id && (
  //       <>
  //         <Link className="nav-link" to="/tripHome">
  //           Trip Info
  //         </Link>
  //         <Link className="nav-link" to="/packingList">
  //           Packing List
  //         </Link>
  //         <Link className="nav-link" to="/groupPackingList">
  //           Group Packing List
  //         </Link>
  //         <Link className="nav-link" to="/outfitters">
  //           Outfitters
  //         </Link>
  //         <LogOutButton className="nav-link"/>
  //       </>
  //     )}
      
  //   </div>
  // </div>
// );

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  state
});

export default connect(mapStateToProps)(Nav);
