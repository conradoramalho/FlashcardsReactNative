import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import styled from "styled-components/native";
import { connect } from "react-redux";
import {
  clearLocalNotification,
  setLocalNotification
} from "../main/Notification";

const StyledView = styled.View`
  flex: 1;
  background-color: white;
  padding: 15px;
  align-items: center;
`;

const StyledButton = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  background-color: #000;
`;

const ButtonText = styled.Text`
  color: #fff;
`;

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
      <StyledView>
        {isDone ? (
          <View>
            <Text h2>Quiz Complete</Text>
            <Text>
              You got {correctCount} out of {questions.length}.
            </Text>
            <Text>
              {Math.round((correctCount / questions.length) * 100, 4)}%
            </Text>
            <StyledButton
              onPress={() =>
                navigation.navigate("Quiz", {
                  title: "Quiz on " + title,
                  deckTitle: title
                })
              }
            >
              <ButtonText>Restart</ButtonText>
            </StyledButton>
            <StyledButton
              onPress={() =>
                navigation.navigate("Deck", {
                  title: title
                })
              }
            >
              <ButtonText>Back</ButtonText>
            </StyledButton>
            <StyledButton onPress={() => navigation.navigate("DeckList")}>
              <ButtonText>Back to List</ButtonText>
            </StyledButton>
          </View>
        ) : (
          <View>
            <Text>{questionsRemaining} questions remaining</Text>
            <Text h2>
              {showAnswer
                ? questions[currentIndex].answer
                : questions[currentIndex].question}
            </Text>
            <StyledButton onPress={this.flipCard.bind(this)}>
              <ButtonText>
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </ButtonText>
            </StyledButton>
            <StyledButton onPress={this.answerCorrectly.bind(this)}>
              <ButtonText>Correct</ButtonText>
            </StyledButton>
            <StyledButton onPress={this.answerIncorrectly.bind(this)}>
              <ButtonText>Incorrect</ButtonText>
            </StyledButton>
          </View>
        )}
      </StyledView>
    );
  }
}

function mapStateToProps({ deckReducer: { decks } }, { navigation }) {
  const { deckTitle } = navigation.state.params;

  return { title: deckTitle, deck: decks.find(x => x.title === deckTitle) };
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
