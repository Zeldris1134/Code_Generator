import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import RoundIconButton from "../../components/RoundIconButton";
import SiteInputModal from "../../components/SiteInputModal";
import Site from "../../components/Site";
import { useSites } from "../../contexts/SiteProvider/SiteProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotFound from "../../components/NotFound/NotFound";

const SitesScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);

  const { sites, setSites, findSites } = useSites();

  const handleOnSubmit = async (address, siteID, addedBy) => {
    const site = {
      id: Date.now(),
      address,
      siteID,
      addedBy,
    };
    const updatedSites = [...sites, site];
    setSites(updatedSites);
    await AsyncStorage.setItem("sites", JSON.stringify(updatedSites));
  };

  const openSite = (site) => {
    navigation.navigate("SiteDetails", { site });
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNotFound(false);
      return await findSites();
    }
    const filteredSites = sites.filter((site) => {
      if (site.address.toLowerCase().includes(text.toLowerCase())) {
        return site;
      }
    });

    if (filteredSites.length) {
      setSites([...filteredSites]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await findSites();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.root}>
          <MaterialIcons
            name="menu"
            onPress={() => navigation.openDrawer()}
            size={40}
            style={{
              alignItems: "flex-start",
              zIndex: 40,
              width: 40,
            }}
          />
          {sites.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              onClear={handleOnClear}
            />
          ) : null}

          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={sites}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Site onPress={() => openSite(item)} item={item} />
              )}
            />
          )}

          {!sites.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Sites</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconButton
        onPress={() => setModalVisible(true)}
        antIconName="plus"
        style={styles.addBtn}
      />
      <SiteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: Platform.OS === "android" ? 30 : 0,
    flex: 1,
    paddingHorizontal: 10,
  },
  sbContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.4,
  },
  emptyHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    zIndex: -1,
  },
  addBtn: {
    position: "absolute",
    right: 25,
    bottom: 50,
    zIndex: 1,
  },
});

export default SitesScreen;
