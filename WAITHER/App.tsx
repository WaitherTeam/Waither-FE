import {StatusBar} from "expo-status-bar";
import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import SplashScreen from "react-native-splash-screen";

export default function App() {
  useEffect(() => {
    if (SplashScreen) {
      SplashScreen.hide();
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
