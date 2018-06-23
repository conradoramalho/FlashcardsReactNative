import * as ACTIONS from '../actions/types';

const INITIAL_STATE = {
  decks: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.RECEIVE_DECKS_REQUEST:
      console.log('action.payload: ', action.payload);

      return {
        ...state,
        decks: [action.payload],
      };
    case ACTIONS.SAVE_DECK_REQUEST:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    case ACTIONS.ADD_QS_DECK_REQUEST:
      const newState = { ...state };
      newState[action.title].questions.push(action.card);
      return { ...state, ...newState };
    case ACTIONS.GET_DECK_REQUEST:
    case ACTIONS.GET_DECK_REQUESTS_REQUEST:
      return { ...state, decks: [...action.decks] };
    default:
      return { ...state };
  }
};

export default reducer;
