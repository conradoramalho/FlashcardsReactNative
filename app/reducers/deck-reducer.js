import * as ACTIONS from "../actions/types";

const INITIAL_STATE = {
  decks: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.RECEIVE_DECKS_REQUEST:
      return {
        ...state,
        decks: [...action.payload]
      };
    case ACTIONS.SAVE_DECK_REQUEST:
      return {
        ...state,
        decks: [...decks, { title: action.title, questions: [] }]
      };
    case ACTIONS.ADD_QS_DECK_REQUEST:
      const decks = state.decks.map(x => {
        if (x.title === action.title)
          return { ...x, questions: [...x.questions, action.card] };

        return { ...x };
      });

      return { ...state, decks: [...decks] };
    case ACTIONS.GET_DECK_REQUEST:
    case ACTIONS.GET_DECK_REQUESTS_REQUEST:
      return action.decks;
    default:
      return state;
  }
};

export default reducer;
