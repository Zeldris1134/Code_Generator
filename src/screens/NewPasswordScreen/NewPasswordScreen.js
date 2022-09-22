import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const NewPasswordScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onSubmitPressed = async (data) => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset Your Password</Text>

        <CustomInput
          placeholder="Username"
          name="username"
          control={control}
          rules={{ required: "Username is required" }}
        />

        <CustomInput
          placeholder="Enter your confirmation code"
          name="code"
          control={control}
          rules={{ required: "Code is required" }}
        />
        <CustomInput
          placeholder="Enter your new password"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be atleast 8 characters long",
            },
          }}
        />
        <CustomButton text={"Submit"} onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          text={"Back to Sign In"}
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#11801E",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#11801E",
    fontWeight: "bold",
  },
});

export default NewPasswordScreen;
