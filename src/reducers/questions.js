import {
  RECEIVE_QUESTIONS,
  ANSWER_QUERSTION,
  ADD_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUERSTION:
      return {
        ...state,
        [action.qid]:{
          ...state[action.qid],
          [action.answer]:{
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        },
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}


  /**

  let answeringTo = {}

  if(question.answeringTo !== null){
    answeringTo = {
      [question.answeringTo]: {
        ...state[question.replyingTo],
        answers: state[question.answerTo].answers.concat([authedUser])
      }
    }
  }

//ADD ANSWER TO USER

[authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          },
        },

*/

