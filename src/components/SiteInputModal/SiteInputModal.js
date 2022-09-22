import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import RoundIconButton from "../RoundIconButton";

const SiteInputModal = ({ visible, onClose, onSubmit, site, isEdit }) => {
  const [address, setAddress] = useState("");
  const [siteID, setSiteID] = useState("");
  const [addedBy, setAddedBy] = useState("");

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setAddress(site.address);
      setSiteID(site.siteID);
      setAddedBy(site.addedBy);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "address") setAddress(text);
    if (valueFor === "siteID") setSiteID(text);
    if (valueFor === "addedBy") setAddedBy(text);
  };

  const handleSubmit = () => {
    if (!address.trim() && !siteID.trim() && !addedBy.trim()) return onClose();

    if (isEdit) {
      onSubmit(address, siteID, addedBy);
    } else {
      onSubmit(address, siteID, addedBy);
      setAddress("");
      setSiteID("");
      setAddedBy("");
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setAddress("");
      setSiteID("");
      setAddedBy("");
    }
    onClose();
  };

  return (
    <>
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            value={address}
            placeholder="Address..."
            style={[styles.input, styles.address]}
            onChangeText={(text) => handleOnChangeText(text, "address")}
          />
          <TextInput
            value={siteID}
            placeholder="Site ID..."
            style={[styles.input, styles.siteID]}
            onChangeText={(text) => handleOnChangeText(text, "siteID")}
          />
          <TextInput
            value={addedBy}
            placeholder="Added By..."
            style={[styles.input, styles.addedBy]}
            onChangeText={(text) => handleOnChangeText(text, "addedBy")}
          />
          <View style={styles.btnContainer}>
            <RoundIconButton
              size={25}
              antIconName="check"
              onPress={handleSubmit}
            />
            {address.trim() || siteID.trim() || addedBy.trim() ? (
              <RoundIconButton
                size={25}
                style={{ marginLeft: 15 }}
                antIconName="close"
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    fontSize: 20,
    color: "#000",
    height: 40,
  },
  address: {
    marginBottom: 10,
  },

  siteID: {
    marginBottom: 10,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
  },
});

export default SiteInputModal;
