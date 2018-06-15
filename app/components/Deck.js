import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { connect } from "react-redux";
import { green, red, white, purple } from "../main/colors";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    };
  };

  render() {
    console.log("this.props: ", this.props);
    const { title } = this.props;
    const deck = this.props.decks[title];
    const questions = deck && deck.questions ? deck.questions : 0;
    const { navigation } = this.props;

    return (
      <View style={styles.deck}>
        <Text h2 style={styles.header}>
          {title}
        </Text>
        <Text h4>{questions.length} card(s) in deck</Text>
        <View>
          {questions.length > 0 ? (
            <Text>Start a quiz by clicking the Start Quiz button!</Text>
          ) : (
            <Text>Add More cards to this deck to take a quiz.</Text>
          )}
        </View>
        <Button
          title="Add a Card"
          backgroundColor={green}
          style={styles.button}
          onPress={() =>
            navigation.navigate("AddCard", {
              title: "Add a card to " + title,
              deckTitle: title
            })
          }
        />
        <Button
          title="Start Quiz"
          backgroundColor={purple}
          style={styles.button}
          disabled={questions.length === 0}
          onPress={() =>
            navigation.navigate("Quiz", {
              title: "Quiz on " + title,
              deckTitle: title
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    backgroundColor: white,
    alignItems: "center",
    padding: 12
  },
  button: {
    padding: 12
  },
  header: {
    paddingRight: 5
  }
});

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params;

  return {
    title,
    decks: state,
    deck: state[title]
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { title } = navigation.state.params;

  return {
    goBack: () => navigation.goBack()
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
