import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { formatUser } from "../utils/helpers";
import { handleLogout } from "../actions/authedUser";

class Nav extends Component {


  handleUserLogout = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(handleLogout())

  }

  render() {
    const { user } = this.props;
    const { name} = user;

    return (
      <nav className="nav">
        {!user ? (
          <ul>
          <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/add">New Question</NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard">Leader Board</NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/add">New Question</NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard">Leader Board</NavLink>
            </li>
            <li>
              <div> Hello, {name}</div>
            </li>
            <li>
              <div className='btn-logout' onClick={this.handleUserLogout}>
                Logout
              </div>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser];
  return {
    user: user ? formatUser(users[authedUser]) : "",
  };
}

export default connect(mapStateToProps)(Nav);
