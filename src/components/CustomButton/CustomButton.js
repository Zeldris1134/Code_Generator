import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: "#2ECC40",
  },

  container_SECONDARY: {
    borderColor: "#2ECC40",
    borderWidth: 2,
  },

  container_GENERATE: {
    backgroundColor: "#2ECC40",
    width: "30%",
    alignSelf: "center",
    marginVertical: 15,
  },

  text: {
    fontWeight: "bold",
    color: "black",
  },

  text_SECONDARY: {
    color: "#2ECC40",
  },

  text_TERTIARY: {
    color: "gray",
  },
  text_GENERATE: {
    fontSize: 16,
  },
});

export default CustomButton;
