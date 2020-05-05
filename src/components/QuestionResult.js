import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import NotFound from "./NotFound";

class QuestionResult extends Component {
  toAnswer = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}`);
  };
  render() {
      const {question} = this.props;
    if (question === undefined) {
      return <NotFound />;
    }
    const { answersOne, answersTwo, authedUser } = this.props;
    const { name, avatar, optionOne, optionTwo } = question;
    const totalAnswers = [...answersOne.votes, ...answersTwo.votes];

    return (
      <div className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar"></img>
        <div className="question-info">
          <span>Asked by: {name}</span>
          <div>Would you rather?</div>
          <div className="result">
            <p className="result">{optionOne.text} </p>
            {answersOne.votes.includes(authedUser) && (
              <p className='answer-p'>You voted same as:</p>
            )}
            <p>
              {(answersOne.votes.length / totalAnswers.length).toFixed(2) * 100}% of users.
            </p>
            <p>
              {answersOne.votes.length} out of {totalAnswers.length} votes.
            </p>
          </div>
          <div className="result">
            <p className="result">{optionTwo.text}</p>
            {answersTwo.votes.includes(authedUser) && (
              <p className='answer-p'>You voted same as:</p>
            )}
            <p>
              {(answersTwo.votes.length / totalAnswers.length).toFixed(2) * 100}% of users.
            </p>
            <p>
              {answersTwo.votes.length} out of {totalAnswers.length} votes.
            </p>
          </div>

          <p>
            <span></span>
          </p>
          <div></div>
          <div />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  if (question === undefined) {
    return question;
  }
  const { optionOne, optionTwo } = question;
  return {
    authedUser,
    answersOne: optionOne,
    answersTwo: optionTwo,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

export default connect(mapStateToProps)(QuestionResult);
