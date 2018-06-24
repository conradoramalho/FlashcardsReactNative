import React, { PureComponent } from 'react';
import { Keyboard, KeyboardAvoidingView, Text } from 'react-native';
import styled from 'styled-components/native';
import { FormLabel, FormInput, TouchableOpacity } from 'react-native-elements';
import { connect } from 'react-redux';
import { addQuestionToDeck } from '../actions';

const StyledView = styled.View`
  padding: 12px;
`;

const ButtonStyled = styled.TouchableOpacity`
  background-color: #000;
  width: 100%;
  padding: 12px;
`;

const ButtonText = styled.Text`
  text-align: center;
  color: #fff;
  padding: 12px;
`;

const pattern = /\s*/;

class AddCard extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title,
    };
  };

  state = {
    question: '',
    answer: '',
    isCardValid: false,
  };

  onQuestionChange = question => {
    const { answer } = this.state;

    this.setState({
      question,
      isCardValid: !this.isEmptyOrInvalid(answer, question),
    });
  };

  onAnswerChange = answer => {
    const { question } = this.state;

    this.setState({
      answer,
      isCardValid: !this.isEmptyOrInvalid(answer, question),
    });
  };

  addCard = () => {
    const { navigation, title, addQuestionToDeck } = this.props;

    const { question, answer } = this.state;

    Keyboard.dismiss();

    addQuestionToDeck(title, { question, answer });

    this.setState({
      question: '',
      answer: '',
      isCardValid: false,
    });

    navigation.navigate('Deck', { title });
  };

  isEmptyOrInvalid = (first, second) =>
    !first ||
    !second ||
    !first.replace(pattern, '').length > 0 ||
    !second.replace(pattern, '').length > 0;

  render() {
    const { question, answer, isCardValid } = this.state;

    return (
      <KeyboardAvoidingView>
        <FormLabel>Question for the Flashcard</FormLabel>
        <FormInput
          onChangeText={this.onQuestionChange}
          placeholder="Question"
          value={question}
        />
        <FormLabel>Answer to the Question</FormLabel>
        <FormInput
          onChangeText={this.onAnswerChange}
          placeholder="Answer"
          value={answer}
        />
        <StyledView>
          <ButtonStyled disabled={!isCardValid} onPress={this.addCard}>
            <ButtonText>Add Card</ButtonText>
          </ButtonStyled>
        </StyledView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ deckReducer: { decks } }, { navigation }) => {
  const { deckTitle } = navigation.state.params;

  return { title: deckTitle, deck: decks.find(x => x.title === deckTitle) };
};

export default connect(
  mapStateToProps,
  { addQuestionToDeck }
)(AddCard);
