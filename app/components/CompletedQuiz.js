import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import styled from "styled-components/native";
import {
  clearLocalNotification,
  setLocalNotification
} from "../main/Notification";

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

export default ({
  title,
  correctCount,
  questionsCount,
  restart,
  navigation
}) => {
  clearLocalNotification().then(setLocalNotification);

  return (
    <StyledView>
      <View>
        <Text h2>Quiz Complete</Text>
        <Text>
          You got {correctCount} out of {questionsCount}.
        </Text>
        <Text>{Math.round((correctCount / questionsCount) * 100, 4)}%</Text>
        <StyledButton onPress={restart}>
          <ButtonText>Restart</ButtonText>
        </StyledButton>
        <StyledButton
          onPress={() =>
            navigation("Deck", {
              title: title
            })
          }
        >
          <ButtonText>Back</ButtonText>
        </StyledButton>
        <StyledButton onPress={() => navigation("DeckList")}>
          <ButtonText>Back to List</ButtonText>
        </StyledButton>
      </View>
    </StyledView>
  );
};
