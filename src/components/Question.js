import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { Link, withRouter } from "react-router-dom";
import NotFound from "./NotFound";

class Question extends Component {
  toAnswer = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}`);
  };
  render() {
    const { question } = this.props;
    const { authedUser } = this.props;
    if (question === null) {
      return <NotFound />;
    }
    const { name, id, avatar, optionOne, optionTwo, answers } = question;
    const hasAnswered = answers.includes(authedUser);

    return (
      <div className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar"></img>
        <div className="question-info">
          <span>{name} asks:</span>
          <div>Would you rather?</div>
          <div>
            <p>{optionOne.text}</p>
            <p>or</p>
            <p>{optionTwo.text}</p>
          </div><br></br>
          <div>
            <div>
              {hasAnswered === true ? (
                <Link className="btn" to={`/question/${id}`}>
                  View result
                </Link>
              ) : (
                <Link className="btn" to={`/question/${id}`}>
                  View poll
                </Link>
              )}
            </div>
            <p>Answers: {answers.length}</p>
          </div>
          <div />
        </div>
      </div>
    );
  }
}
//What our component need from Redux Store
function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
