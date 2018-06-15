import React from "react";
import { View } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./app/reducers";
import FlashStatusBar from "./app/components/FlashStatusBar";
import { black } from "./app/main/colors";
import { setLocalNotification } from "./app/main/Notification";
import Navigation from "./app/main/Router";
import reduxThunk from "redux-thunk";

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducer, {}, applyMiddleware(reduxThunk));

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashStatusBar backgroundColor={black} barStyle="light-content" />
          <Navigation />
        </View>
      </Provider>
    );
  }
}
