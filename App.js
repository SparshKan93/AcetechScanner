import React, { useEffect, useState } from "react";
import { View, StatusBar as RNStatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Scan from "./Components/Scan";
import Navbar from "./Components/Navbar";
import Create from "./Components/Create";
import History from "./Components/History";
import ScannedLink from "./Components/ScannedLink";
import { AppProvider, useAppContext } from "./Context/AppContext";
import DataEntryScreen from "./Components/DataEntryScreen";
import Home from "./Components/Home";
import AboutUs from "./Components/AboutUs";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import SplashScreen from "./Components/SplashScreen";

const Stack = createNativeStackNavigator();
const BottomBar = () => <View style={styles.bottomBar} />;

// AppContent component
function AppContent() {
  const [showNavbar, setShowNavbar] = useState(true);
  const { isLoading, userData } = useAppContext();

  useEffect(() => {
    RNStatusBar.setBackgroundColor("black");
    RNStatusBar.setBarStyle("light-content");
  }, []);

  if (isLoading) {
    // Show a splash/loading screen while initializing
    return <SplashScreen setShowNavbar={setShowNavbar} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Conditionally Render Navbar */}
      {showNavbar && <Navbar />}
      <Stack.Navigator
        initialRouteName={userData ? "Home" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen">
          {(props) => <SplashScreen {...props} setShowNavbar={setShowNavbar} />}
        </Stack.Screen>
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setShowNavbar={setShowNavbar} />}
        </Stack.Screen>
        <Stack.Screen name="Signup">
          {(props) => <Signup {...props} setShowNavbar={setShowNavbar} />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} setShowNavbar={setShowNavbar} />}
        </Stack.Screen>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="ScannedLink" component={ScannedLink} />
        <Stack.Screen name="DataEntry" component={DataEntryScreen} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
      </Stack.Navigator>
      {showNavbar && <BottomBar />}
    </View>
  );
}


export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="black" translucent={false} />
        <AppContent />
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    height: 40,
    backgroundColor: "#007bff",
    width: "100%",
    justifyContent: "center",
  },
});
