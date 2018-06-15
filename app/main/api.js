import { AsyncStorage } from "react-native";
import { setupInitialResults, FLASHCARDS_STORAGE_KEY } from "./_cards";

class API {
  static getDecks = () =>
    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(setupInitialResults);

  static getDeck = title =>
    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
      const decks = JSON.parse(results);
      return decks[title];
    });

  static saveDeckTitle = title =>
    AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    );

  static addCardToDeck = (title, card) =>
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
            [title]: {
              title,
              questions: updatedQuestions
            }
          })
        );
      })
      .catch(() => {
        console.log("Error adding card.");
      });
}

export default API;
