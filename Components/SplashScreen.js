// SplashScreen Component
import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";

const SplashScreen = ({ setShowNavbar }) => {
  useEffect(() => {
    setShowNavbar(true); 
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the App!</Text>
      <Button title="Go to Login" onPress={() => setShowNavbar(true)} />
    </View>
  );
};

export default SplashScreen;
