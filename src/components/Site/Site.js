import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Site = ({ item, onPress }) => {
  const { address, siteID, addedBy } = item;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={1}>
          {address}
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          {siteID}
        </Text>
        <Text style={styles.text} numberOfLines={1}>
          {addedBy}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderWidth: 4,
    borderColor: "#2ECC40",
    width: width,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 5,
  },
  text: {
    paddingHorizontal: 5,
    fontSize: 17,
  },
});

export default Site;
