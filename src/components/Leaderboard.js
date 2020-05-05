import React, { Component } from "react";
import { connect } from "react-redux";
import { formatUser } from "../utils/helpers";

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.users.map((user) => (
            <li key={user.id}>
              <div className="user-card">
                <img
                  src={user.avatar}
                  alt={`Avatar of ${user.name}`}
                  className="avatar"
                ></img>
                <div>{user.name}</div>
                <div>
                  <p>Questions asked: {user.nQuestions}</p>
                  <p>Questions answered: {user.nAnswers}</p>
                  <p>Total score: {user.score}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const usersList = Object.values(users);
  const formatedUsers = usersList.map((user) => formatUser(user));
  return {
    users: formatedUsers.sort((a, b) => b.score - a.score),
  };
}

export default connect(mapStateToProps)(Leaderboard);
