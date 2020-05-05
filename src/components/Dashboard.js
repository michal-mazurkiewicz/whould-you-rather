import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Dashboard extends Component {
  state = {
    unanswered: true,
  };

  handleSetAnswered = (e) => {
    e.preventDefault();
    this.setState(() => ({
      unanswered: false,
    }));
  };
  handleSetUnanswered = (e) => {
    e.preventDefault();

    this.setState(() => ({
      unanswered: true,
    }));
  };

  render() {
    console.log('Dashboard props', this.props);
    const {userAnswers} = this.props
    const {unanswered} = this.state

    console.log('User Answers', userAnswers);
    return (
      <div>
        <h3> All Questions </h3>
        <div>
        <button style={unanswered ? {background: 'green'} : {}} onClick={this.handleSetUnanswered}>Unanswered</button>
          <button style={unanswered ? {} : {background: 'green'}} onClick={this.handleSetAnswered}>Answered</button>

        </div>
        <ul>
        {unanswered ? (this.props.questionIds.filter((id) => !userAnswers.includes(id)).map((id) => <li key={id}>
              <Question id={id} />
            </li>)) : (this.props.questionIds.filter((id) => userAnswers.includes(id)).map((id) => <li key={id}>
              <Question id={id} /></li>))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const answers = users[authedUser].answers

  return {
    questions,
    userAnswers: Object.keys(answers),
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
