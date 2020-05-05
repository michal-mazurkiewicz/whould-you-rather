import React, { Component } from "react";
import { formatUser } from "../utils/helpers";
import { connect } from "react-redux";

class User extends Comment {
  render() {
    return (
      <div>
        {this.props.usersList.map((user) => (
          <div className="user-card">
            <img
              src={user.avatar}
              alt={`Avatar of ${user.name}`}
              className="avatar"
            ></img>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  return {
    user: user ? formatUser(user) : null,
  };
}

export default connect(mapStateToProps)(User)