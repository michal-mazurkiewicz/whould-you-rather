import { saveQuestionAnswer } from "../utils/api";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER = "ADD_ANSWER";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addUserAnswer(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function addUserQuestion(authedUser, qid) {
  return {
    type: ADD_USER_QUESTION,
    authedUser,
    qid
  };
}

export function handleAddUserAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return saveQuestionAnswer({ authedUser, qid, answer }).then(() =>
      dispatch(addUserAnswer(authedUser, qid, answer))
    );
  };
}
