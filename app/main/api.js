import { AsyncStorage } from "react-native";
import { setupInitialResults, FLASHCARDS_STORAGE_KEY } from "./_cards";

const getDecks = () =>
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(setupInitialResults);

const getDeck = title =>
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(decks => decks.find(x => x.title === title));

const saveDeckTitle = async title => {
  const decks = await getDecks();

  return AsyncStorage.setItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify([
      ...decks,
      {
        title,
        questions: []
      }
    ])
  );
};

const addCardToDeck = async (title, card) => {
  const decks = await getDecks();

  const newDecks = decks.map(x => {
    if (x.title === title) return { ...x, questions: [...x.questions, card] };

    return { ...x };
  });

  return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(newDecks));
};

export default {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck
};
