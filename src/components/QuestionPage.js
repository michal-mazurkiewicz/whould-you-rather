import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { handleQuestionAnswer } from "../actions/shared";
import { Redirect } from "react-router-dom";
import NotFound from "./NotFound";

class QuestionPage extends Component {

state = {
  answer: '',
  hasAnswered: false
}

handleChange = (e) => {
  this.setState(({
    answer: e.target.value
  }));
}

  handleSubmit = (e) => {
    e.preventDefault()
    const {dispatch, qid} = this.props
    const {answer} = this.state
    dispatch(handleQuestionAnswer(qid, answer))
    this.setState(() => ({
      answer: '',
      hasAnswered: true
    }))
  }


  render() {
    const { question } = this.props;
    const {hasAnswered, answer} = this.state;

    if(question === null){
      return <NotFound/>
    }

    const {
      name,
      avatar,
      optionOne,
      optionTwo,
    } = question;

    if(hasAnswered === true){
      return <Redirect to={`/results/${this.props.qid}`}/>
    }

    return (
      <div className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar"></img>
        <div className="question-info">
          <span>{name} asks:</span>
          <div>Would you rather?</div>
          <form onSubmit={this.handleSubmit}>
          <div>
          <input type="radio" id="optionOne" name="drone" value='optionOne' onChange={this.handleChange}/>
          <label> {optionOne.text}</label>
          </div>

          <div>
          <input type="radio" id="optionTwo" name="drone" value='optionTwo' onChange={this.handleChange}/>
          <label> {optionTwo.text}</label>
        </div>
            <div>
              <button type="submit" disabled={answer === null} className='btn'>Submit</button>
            </div>
          </form>

          <div></div>
          <div />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  return {
    qid: id,
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
}

export default connect(mapStateToProps)(QuestionPage);
