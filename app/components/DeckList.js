import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, AsyncStorage } from 'react-native';
import DeckSummary from './DeckSummary';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { getAllDecks, receiveDecks } from '../actions';
import API from '../main/api';

class DeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
    };
  };

  state = {
    isReady: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    // this.getKey();

    API.getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ isReady: true })));
  }

  // async getKey() {
  //   try {
  //     console.log('value: ', value);
  //     await AsyncStorage.setItem('@MySuperStore:key', 'value: 10');

  //     console.log('value: insert', value);
  //     const value = await AsyncStorage.getItem('@MySuperStore:key');
  //     console.log('value: response', value);
  //     this.setState({ myKey: 'value' });
  //   } catch (error) {
  //     console.log('Error retrieving data' + error);
  //   }
  // }

  // async getKey() {
  //   try {
  //     console.log('value: insert', value);
  //     const value = await AsyncStorage.getItem('@MySuperStore:key');
  //     console.log('value: response', value);
  //     this.setState({ myKey: 'value' });
  //   } catch (error) {
  //     console.log('Error retrieving data' + error);
  //   }
  // }

  render() {
    const { decks, navigation } = this.props;
    const { isReady } = this.state;

    if (!isReady) return <AppLoading />;

    return (
      <View style={styles.deck}>
        <FlatList
          style=""
          data={this.props.decks}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <DeckSummary deck={item} navigation={navigation} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    marginTop: 12,
  },
});

const mapStateToProps = state => {
  console.log('state: ', state);

  const {
    deckReducer: { decks },
  } = state;

  console.log('decks: ', decks);

  return {
    decks: decks.map((val, title) => ({ ...val, title })),
  };
};

export default connect(mapStateToProps)(DeckList);
