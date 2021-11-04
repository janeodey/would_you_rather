import {
  LOAD_QUESTIONS,
  ANSWER_QUESTION,
  ADD_QUESTION
} from "../actions/questions";


export default function questions(state = {}, action) {
  if (action.type ===  LOAD_QUESTIONS) {
      return { ...state, ...action.questions };
  }
  else if (action.type ===  ANSWER_QUESTION) {
    const { authedUser, qid, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: [...state[qid][answer].votes, authedUser]
          }
        }
  }
    
  }
  else if(action.type === ADD_QUESTION){
    const { question } = action;
      return { ...state, [question.id]: question };
     
  }
  else{
    return state;
  }
}
