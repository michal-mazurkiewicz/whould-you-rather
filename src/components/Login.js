import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleLogin } from "../actions/authedUser";

class Login extends Component {
  state = {
    authedUser: "",
    hasAuthenticated: false,
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      authedUser: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    if (this.state.authedUser) {
      dispatch(handleLogin(this.state.authedUser));
      this.setState({ hasAuthenticated: true });
    } else alert("Chose login");
  };

  render() {
    return (
      <div>
        {this.state.hasAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <form onSubmit={this.handleSubmit}>
            <h2>Login</h2>
            <p>Chose user from list:</p>
            <select onChange={this.handleChange}>
              <option defaultChecked value="">
                Select user
              </option>
              {Object.keys(this.props.users).map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
            <div>
              <button className="btn">Login</button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Login);
