import { SET_AUTHED_USER } from "../actions/authedUser";

const authedUser = (state = null, action) => {
  if(action.type === SET_AUTHED_USER) {
      return action.id;
  }else{
    return state;
  }
}

export default authedUser