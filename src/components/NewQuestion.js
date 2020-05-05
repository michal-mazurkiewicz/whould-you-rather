import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  //Controlled Component, UI changes depends on state of Component
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  handleChangeOptionOne = (e) => {
    const optionOneText = e.target.value;

    this.setState(() => ({
      optionOneText,
    }));
  };

  handleChangeOptionTwo = (e) => {
    const optionTwoText = e.target.value;
    this.setState(() => ({
      optionTwoText,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;
    // Todo add new question to store
    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState(() => ({
      optionOneText: "",
      optionTwoText: "",
      toHome: true,
    }));
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    //TODO: Redirect to home view if submited

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    const answerOneLeft = 280 - optionOneText.length;
    const answerTwoLeft = 280 - optionTwoText.length;

    return (
      <div>
        <h3 className="center">Compose New Question</h3>
        <h4 className="center">Would You Rather...?</h4>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Optione one"
            value={optionOneText}
            onChange={this.handleChangeOptionOne}
            className="textarea"
            maxLength={280}
          />{" "}
          {answerOneLeft <= 100 && (
            <div className="question-lenght">{answerOneLeft}</div>
          )}
          <textarea
            placeholder="Optione two"
            value={optionTwoText}
            onChange={this.handleChangeOptionTwo}
            className="textarea"
            maxLength={280}
          />
          {answerTwoLeft <= 100 && (
            <div className="question-lenght">{answerTwoLeft}</div>
          )}
          <div>
            <button
              className="btn"
              type="submit"
              disabled={optionOneText === "" || optionTwoText === ""}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);
