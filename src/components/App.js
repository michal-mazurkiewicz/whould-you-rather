import React, { Component, Fragment } from "react";
import "../styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import Nav from "../components/Nav";
import Leaderboard from "../components/Leaderboard";
import Login from "./Login";
import QuestionResult from "./QuestionResult";
import NotFound from './NotFound';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">

            {this.props.authedUser === null ? (
              <div>
              <Nav/>
              <header className="App-header">
              <Route component={Login} />
              </header>
              </div>
            ) : (
              <div>
                <Nav />
                <header className="App-header">
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/question/:id" component={QuestionPage} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/login" component={Login} />
                  <Route path="/results/:id" component={QuestionResult} />
                  <Route component={NotFound}/>
                  </Switch>
                </header>
              </div>
            )}

          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
