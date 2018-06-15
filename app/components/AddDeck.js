import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import GenericButton from "./GenericButton";
import { white, blue } from "../main/colors";
import { connect } from "react-redux";
import { addNewDeck } from "../actions";

class AddDeck extends Component {
  state = {
    deckTitle: "",
    isTitleValid: false
  };

  onTitleChange(title) {
    const isEmpty = !title;
    const hasDeckWithTitle = this.props.decks.includes(title.toUpperCase());

    this.setState({
      deckTitle: title,
      isTitleValid: !isEmpty && !hasDeckWithTitle
    });
  }

  addDeck() {
    const { navigation } = this.props;
    const title = this.state.deckTitle;
    Keyboard.dismiss();
    this.setState({
      deckTitle: "",
      isTitleValid: false
    });

    this.props.addNewDeck(title).then(() => {
      navigation.navigate("Deck", { title });
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <FormLabel>Enter a Title for the New Deck</FormLabel>
        <FormInput
          onChangeText={this.onTitleChange.bind(this)}
          placeholder="Title of the New Deck"
          value={this.state.deckTitle}
        />
        <Button
          title="Create Deck"
          backgroundColor={blue}
          style={styles.button}
          disabled={!this.state.isTitleValid}
          onPress={this.addDeck.bind(this)}
        />
      </KeyboardAvoidingView>
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

function mapStateToProps(data) {
  const keys = Object.keys(data);
  return {
    decks: keys.map(key => key.toUpperCase())
  };
}

export default connect(
  mapStateToProps,
  { addNewDeck }
)(AddDeck);
