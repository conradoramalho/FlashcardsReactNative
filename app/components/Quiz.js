import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { green, red, white, purple, orange } from "../main/colors";
import GenericButton from "./GenericButton";
import { connect } from "react-redux";
import {
  clearLocalNotification,
  setLocalNotification
} from "../main/Notification";

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    };
  };

  state = {
    currentIndex: 0,
    correctCount: 0,
    showAnswer: false
  };

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  answerCorrectly() {
    let { currentIndex, correctCount } = this.state;
    currentIndex++;
    correctCount++;

    this.setState({
      currentIndex,
      correctCount,
      showAnswer: false
    });
  }

  answerIncorrectly() {
    let { currentIndex, correctCount } = this.state;
    currentIndex++;

    this.setState({
      currentIndex,
      correctCount,
      showAnswer: false
    });
  }

  flipCard() {
    let { currentIndex, correctCount, showAnswer } = this.state;
    showAnswer = !showAnswer;

    this.setState({
      currentIndex,
      correctCount,
      showAnswer
    });
  }

  render() {
    const questions = this.props.deck ? this.props.deck.questions : "";
    const { goBack, navigation, title } = this.props;
    const { currentIndex, correctCount, showAnswer } = this.state;
    const questionsRemaining = questions.length - currentIndex - 1;
    const isDone = questionsRemaining === -1;

    return (
      <View style={styles.container}>
        {isDone ? (
          <View>
            <Text h2>Quiz Complete</Text>
            <Text>
              You got {correctCount} out of {questions.length}.
            </Text>
            <Text>
              {Math.round((correctCount / questions.length) * 100, 4)}%
            </Text>
            <Button
              title="Restart Quiz"
              backgroundColor={green}
              style={styles.button}
              onPress={() =>
                navigation.navigate("Quiz", {
                  title: "Quiz on " + title,
                  deckTitle: title
                })
              }
            />
            <Button
              title="Back to Deck"
              backgroundColor={purple}
              style={styles.button}
              onPress={() => navigation.navigate("Deck", { title: title })}
            />
            <Button
              title="Back to Deck List"
              backgroundColor={orange}
              style={styles.button}
              onPress={() => navigation.navigate("DeckList")}
            />
          </View>
        ) : (
          <View>
            <Text>{questionsRemaining} questions remaining</Text>
            <Text h2>
              {showAnswer
                ? questions[currentIndex].answer
                : questions[currentIndex].question}
            </Text>
            <Button
              title={showAnswer ? "Hide Answer" : "Show Answer"}
              backgroundColor={orange}
              style={styles.button}
              onPress={this.flipCard.bind(this)}
            />
            <Button
              title="Correct"
              backgroundColor={green}
              style={styles.button}
              onPress={this.answerCorrectly.bind(this)}
            />
            <Button
              title="Incorrect"
              backgroundColor={red}
              style={styles.button}
              onPress={this.answerIncorrectly.bind(this)}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    alignItems: "center"
  },
  button: {
    padding: 12
  }
});

function mapStateToProps(state, { navigation }) {
  const { deckTitle } = navigation.state.params;

  return {
    title: deckTitle,
    deck: state[deckTitle]
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckTitle } = navigation.state.params;

  return {
    goBack: () => navigation.goBack()
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
