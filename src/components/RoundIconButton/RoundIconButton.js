import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const RoundIconButton = ({ antIconName, size, color, style, onPress }) => {
  return (
    <AntDesign
      name={antIconName}
      size={size || 25}
      color={color || "blue"}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#2ECC40",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    color: "black",
  },
});

export default RoundIconButton;
