import React, { PureComponent } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import styled from "styled-components/native";
import { connect } from "react-redux";
import CompletedQuiz from "./CompletedQuiz";

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

class Quiz extends PureComponent {
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

  answerCorrectly = () => {
    let { currentIndex, correctCount } = this.state;
    currentIndex++;
    correctCount++;

    this.setState({
      currentIndex,
      correctCount,
      showAnswer: false
    });
  };

  answerIncorrectly = () => {
    let { currentIndex, correctCount } = this.state;
    currentIndex++;

    this.setState({
      currentIndex,
      correctCount,
      showAnswer: false
    });
  };

  flipCard = () => {
    let { currentIndex, correctCount, showAnswer } = this.state;
    showAnswer = !showAnswer;

    this.setState({
      currentIndex,
      correctCount,
      showAnswer
    });
  };

  restart = () =>
    this.setState({
      currentIndex: 0,
      correctCount: 0,
      showAnswer: false
    });

  render() {
    const questions = this.props.deck ? this.props.deck.questions : "";
    const { title, navigation } = this.props;
    const { currentIndex, correctCount, showAnswer } = this.state;
    const questionsRemaining = questions.length - currentIndex - 1;
    const isDone = questionsRemaining === -1;

    return (
      <StyledView>
        {isDone ? (
          <CompletedQuiz
            title={title}
            correctCount={correctCount}
            questionsCount={questions.length}
            navigation={navigation.navigate}
            restart={this.restart}
          />
        ) : (
          <View>
            <Text>{questionsRemaining} questions remaining</Text>
            <Text h2>
              {showAnswer
                ? questions[currentIndex].answer
                : questions[currentIndex].question}
            </Text>
            <StyledButton onPress={this.flipCard}>
              <ButtonText>
                {showAnswer ? "Hide Answer" : "Show Answer"}
              </ButtonText>
            </StyledButton>
            <StyledButton onPress={this.answerCorrectly}>
              <ButtonText>Correct</ButtonText>
            </StyledButton>
            <StyledButton onPress={this.answerIncorrectly}>
              <ButtonText>Incorrect</ButtonText>
            </StyledButton>
          </View>
        )}
      </StyledView>
    );
  }
}

const mapStateToProps = ({ deckReducer: { decks } }, { navigation }) => {
  const { deckTitle } = navigation.state.params;

  return { title: deckTitle, deck: decks.find(x => x.title === deckTitle) };
};

export default connect(mapStateToProps)(Quiz);
