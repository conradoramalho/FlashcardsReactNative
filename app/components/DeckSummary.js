import React from "react";
import { View, Platform, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { white } from "../main/colors";

const StyledView = styled.View`
  background-color: ${white};
  padding: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 17px;
  justify-content: center;
  shadow-radius: 3px;
  shadow-opacity: 0.8;
  shadow-color: rgba(0, 0, 0, 0.24);
  shadow-offset: 0 3px;
`;

const StyledText = styled.Text`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

export default ({ deck, navigation }) => (
  <StyledView>
    {deck.questions && (
      <TouchableOpacity
        onPress={() => navigation.navigate("Deck", { title: deck.title })}
      >
        <StyledText>{deck.title}</StyledText>
        <StyledText>Card Count: {deck.questions.length}</StyledText>
      </TouchableOpacity>
    )}
  </StyledView>
);
