import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import RoundIconButton from "../RoundIconButton";
import { useSites } from "../../contexts/SiteProvider/SiteProvider";
import React, { useState } from "react";
import { AsyncStorage } from "@aws-amplify/core";
import SiteInputModal from "../SiteInputModal";

const SiteDetails = (props) => {
  const [site, setSite] = useState(props.route.params.site);
  const headerheight = useHeaderHeight();
  const { setSites } = useSites();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteSite = async () => {
    const result = await AsyncStorage.getItem("sites");
    let sites = [];
    if (result !== null) sites = JSON.parse(result);

    const newSites = sites.filter((n) => n.id !== site.id);
    setSites(newSites);
    await AsyncStorage.setItem("sites", JSON.stringify(newSites));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are You Sure!",
      "This site will be deleted permanently!",
      [
        {
          text: "Delete",
          onPress: deleteSite,
        },
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (address, siteID, addedBy) => {
    const result = await AsyncStorage.getItem("sites");
    let sites = [];
    if (result !== null) sites = JSON.parse(result);

    const newSites = sites.filter((n) => {
      if (n.id === site.id) {
        n.address = address;
        n.siteID = siteID;
        n.addedBy = addedBy;
        n.isUpdated = true;

        setSite(n);
      }
      return n;
    });

    setSites(newSites);
    await AsyncStorage.setItem("sites", JSON.stringify(newSites));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <View style={[styles.container, { paddingTop: headerheight }]}>
      <Text style={styles.title}>{site.address}</Text>
      <Text style={styles.text}>Site ID: {site.siteID}</Text>
      <Text style={styles.text}>Added By: {site.addedBy}</Text>

      <View style={styles.btnContainer}>
        <RoundIconButton
          antIconName="delete"
          style={{
            backgroundColor: "red",
            borderColor: "red",
            color: "white",
            marginBottom: 15,
            alignSelf: "center",
          }}
          onPress={displayDeleteAlert}
        />
        <RoundIconButton
          antIconName="edit"
          style={{
            backgroundColor: "dodgerblue",
            alignSelf: "center",
          }}
          onPress={openEditModal}
        />
      </View>
      <SiteInputModal
        isEdit={isEdit}
        site={site}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 60 : 0,
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  text: {
    fontSize: 20,
    opacity: 0.6,
    paddingBottom: 5,
  },
  btnContainer: {
    position: "absolute",
    right: 25,
    bottom: 50,
  },
});

export default SiteDetails;
