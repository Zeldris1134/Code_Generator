import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Logo from "../../../assets/images/logo.png";
import NumberInput from "../../components/NumberInput/NumberInput";
import CustomButton from "../../components/CustomButton";
import CustomText from "../../components/CustomText";
import CodeGenerator, {
  Result8Digit,
  Result6Digit,
  Result4Digit,
} from "../../code/GeneratorCode/CodeGenerator";

const Home = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [siteID, setSiteID] = useState("");
  const [key, setKey] = useState("");
  const [EightDigit, setEightDigit] = useState("");
  const [SixDigit, setSixDigit] = useState("");
  const [FourDigit, setFourDigit] = useState("");
  const [resetSiteID, setResetSiteID] = useState();
  const [resetKey, setResetKey] = useState();

  const GeneratePressed = () => {
    if (siteID == "" || key == "") {
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    CodeGenerator(siteID, key);
    setEightDigit(Result8Digit);
    setSixDigit(Result6Digit);
    setFourDigit(Result4Digit);
    setLoading(false);
  };

  const RefreshPage = () => {
    setTimeout(() => {
      setResetSiteID("");
      setResetKey("");
      setSiteID("");
      setKey("");
      setEightDigit("");
      setSixDigit("");
      setFourDigit("");
      setResetSiteID({ siteID });
      setResetKey({ key });
    }, 100);
  };

  return (
    <View style={styles.root}>
      <View style={styles.flexRowTop}>
        <MaterialIcons
          name="menu"
          onPress={() => navigation.openDrawer()}
          size={40}
          style={{
            padding: 10,
          }}
        />
        <Feather
          name="refresh-ccw"
          size={33}
          color="black"
          onPress={RefreshPage}
          style={{ padding: 15 }}
        />
      </View>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.125 }]}
        resizeMode="contain"
      />
      <Text style={styles.label}>Site ID</Text>
      <NumberInput
        name={"SiteID"}
        value={resetSiteID}
        placeholder={"Enter 8 digit Site ID"}
        onChangeText={(siteID) => setSiteID(siteID)}
      />
      <Text style={styles.keyLabel}>Key</Text>
      <NumberInput
        name={"Key"}
        value={resetKey}
        placeholder={"Enter 8 digit Key"}
        onChangeText={(key) => setKey(key)}
        secureTextEntry
      />
      <View style={styles.result_container}>
        <CustomText
          heading={"Result (8 Digit)"}
          bgColor={"#4FE329"}
          text={EightDigit}
        ></CustomText>
        <CustomText
          heading={"Result (6 Digit)"}
          bgColor={"#29E373"}
          text={SixDigit}
        />
        <CustomText
          heading={"Result (4 Digit)"}
          bgColor={"#27D9A0"}
          text={FourDigit}
        />
      </View>
      <CustomButton
        text={loading ? "Generating..." : "Generate"}
        onPress={GeneratePressed}
        type="GENERATE"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: Platform.OS === "android" ? 30 : 0,
    flex: 1,
  },
  flexRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: "75%",
    maxWidth: 500,
    maxHeight: 200,
    alignSelf: "center",
  },
  label: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 30,
  },
  keyLabel: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 15,
  },
  result_container: {
    width: "60%",
    alignSelf: "center",
    marginTop: 15,
  },
});

export default Home;
