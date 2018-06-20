import React, { Component } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";

const StyledView = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  padding: 12px;
`;

const Header = styled.Text`
  padding-right: 5px;
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

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    };
  };

  render() {
    const { title, navigation, deck } = this.props;
    const questions = deck && deck.questions ? deck.questions : 0;

    return (
      <StyledView>
        <Header h2>{title}</Header>
        <Text h4>{questions.length} card(s) in deck</Text>
        <View>
          {questions.length > 0 ? (
            <Text>Start a quiz by clicking the Start Quiz button!</Text>
          ) : (
            <Text>Add More cards to this deck to take a quiz.</Text>
          )}
        </View>
        <StyledButton
          onPress={() =>
            navigation.navigate("AddCard", {
              title: `Add a card to ${title}`,
              deckTitle: title
            })
          }
        >
          <ButtonText>Add a Card</ButtonText>
        </StyledButton>
        <StyledButton
          disabled={questions.length === 0}
          onPress={() =>
            navigation.navigate("Quiz", {
              title: `Quiz on ${title}`,
              deckTitle: title
            })
          }
        >
          <ButtonText>Start Quiz</ButtonText>
        </StyledButton>
      </StyledView>
    );
  }
}

const mapStateToProps = ({ deckReducer: { decks } }, { navigation }) => {
  const { title } = navigation.state.params;

  return { title, deck: decks.find(x => x.title === title) };
};

const mapDispatchToProps = (dispatch, { navigation }) => ({
  goBack: () => navigation.goBack()
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
