import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";
import DeckSummary from "./DeckSummary";
import { AppLoading } from "expo";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import API from "../main/api";

class DeckList extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: "Home"
  });

  state = {
    isReady: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    API.getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ isReady: true })));
  }

  render() {
    const { decks, navigation } = this.props;
    const { isReady } = this.state;

    if (!isReady) return <AppLoading />;

    return (
      <View>
        <FlatList
          data={decks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <DeckSummary deck={item} navigation={navigation} />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ deckReducer: { decks } }) => ({
  decks
});

export default connect(mapStateToProps)(DeckList);
