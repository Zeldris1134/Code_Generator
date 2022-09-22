import "react-native-gesture-handler";
import { SafeAreaView, StyleSheet } from "react-native";
import Navigation from "./src/navigation";
import SiteProvider from "./src/contexts/SiteProvider/SiteProvider";
import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";

Amplify.configure(awsconfig);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SiteProvider>
        <Navigation />
      </SiteProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});

export default App;
