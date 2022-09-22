import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

const NumberInput = ({
  placeholder,
  name,
  onChangeText,
  secureTextEntry,
  value,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={StyleSheet.input}
        name={name}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {},
});

export default NumberInput;
