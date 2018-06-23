import React from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import AddDeck from "../components/AddDeck";
import AddCard from "../components/AddCard";
import Deck from "../components/Deck";
import DeckList from "../components/DeckList";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Quiz from "../components/Quiz";

const Tabs = createMaterialTopTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "All Decks",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      style: {
        height: 56,
        backgroundColor: "#000",
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const Navigation = createStackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: "#000"
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: "#000"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: "#000"
    }
  }
});

export default Navigation;
