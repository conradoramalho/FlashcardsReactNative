import API from "../main/api";
import * as ACTIONS from "./types";

export const receiveDecks = decks => ({
  type: ACTIONS.RECEIVE_DECKS_REQUEST,
  payload: decks
});

export const addNewDeck = title => dispatch =>
  API.saveDeckTitle(title).then(() =>
    dispatch({
      type: ACTIONS.SAVE_DECK_REQUEST,
      title
    })
  );

export const getAllDecks = () => ({
  type: ACTIONS.GET_DECK_REQUESTS_REQUEST,
  payload: API.getDecks()
});

export const getDeckByTitle = title => ({
  type: ACTIONS.GET_DECK_REQUEST,
  payload: API.getDeck(title)
});

export const addQuestionToDeck = (title, card) => {
  return dispatch => {
    API.addCardToDeck(title, card).then(() => {
      dispatch({ type: ACTIONS.ADD_QS_DECK_REQUEST, title, card });
    });
  };
};
