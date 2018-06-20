import { AsyncStorage } from "react-native";
import { setupInitialResults, FLASHCARDS_STORAGE_KEY } from "./_cards";

const getDecks = () =>
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(setupInitialResults);

const getDeck = title =>
  AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    const decks = JSON.parse(results);
    return decks.find(x => x.title === title);
  });

const saveDeckTitle = title =>
  AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      title,
      questions: []
    })
  );

const addCardToDeck = (title, card) =>
  getDeck(title)
    .then(result => {
      return result;
    })
    .then(deck => {
      const { question, answer } = card;
      const updatedQuestions = deck.questions.concat({
        question,
        answer
      });

      AsyncStorage.mergeItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify({
          title,
          questions: updatedQuestions
        })
      );
    })
    .catch(() => {
      console.log("Error");
    });

export default {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck
};
