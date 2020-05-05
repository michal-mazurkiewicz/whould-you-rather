import { getInitialData } from "../utils/api.js";
import { receiveUsers, handleAddUserAnswer } from "../actions/users";
import { receiveQuestions, handleAnswerQuestion } from "../actions/questions";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleQuestionAnswer(qid, answer){
  return (dispatch) => {
    dispatch(handleAnswerQuestion(qid, answer));
    dispatch(handleAddUserAnswer(qid,answer));
  }
}

