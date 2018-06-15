import * as ACTIONS from "../actions/types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.RECEIVE_DECKS_REQUEST:
      console.log("action: ", action);
      console.log("state: ", state);
      return {
        ...state,
        ...action.decks
      };
    case ACTIONS.SAVE_DECK_REQUEST:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };
    case ACTIONS.ADD_QS_DECK_REQUEST:
      const newState = { ...state };
      newState[action.title].questions.push(action.card);
      return newState;
    case ACTIONS.GET_DECK_REQUEST:
    case ACTIONS.GET_DECK_REQUESTS_REQUEST:
      return action.decks;
    default:
      return state;
  }
};

export default reducer;
