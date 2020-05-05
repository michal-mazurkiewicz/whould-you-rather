import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";
import {addUserQuestion} from './users'

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUERSTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUERSTION,
    authedUser,
    qid,
    answer,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    const {authedUser} = getState();

    return saveQuestionAnswer({authedUser, qid, answer}).then(() =>
      dispatch(answerQuestion(authedUser, qid, answer))
    );
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then((question) => dispatch(addUserQuestion(authedUser, question.question.id)))
      .then(() => dispatch(hideLoading()));
  };
}
