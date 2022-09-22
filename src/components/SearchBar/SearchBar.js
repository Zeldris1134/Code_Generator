import { View, TextInput, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

const SearchBar = ({ value, onClear, onChangeText }) => {
  return (
    <>
      <View style={styles.container}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.searchBar}
          placeholder="Search..."
        />
        {value ? (
          <AntDesign
            style={styles.clearIcon}
            name="close"
            size={20}
            color={"#2ECC40"}
            onPress={onClear}
          />
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderColor: "#000",
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  container: {
    justifyContent: "center",
  },
  clearIcon: {
    position: "absolute",
    right: 20,
  },
});

export default SearchBar;
