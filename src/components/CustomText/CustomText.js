import { View, Text, StyleSheet } from "react-native";
import React from "react";

const CustomText = ({ text, bgColor, heading }) => {
  return (
    <View>
      <Text style={styles.heading}>{heading}</Text>
      <View
        style={[styles.container, bgColor ? { backgroundColor: bgColor } : {}]}
      >
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 5,
    backgroundColor: "#4FE329",
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  heading: {
    textAlign: "center",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomText;
