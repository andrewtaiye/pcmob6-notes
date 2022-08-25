import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import AuthScreen from "./screens/AuthScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { AUTH_SCREEN, PROFILE_SCREEN } from "./constants";
const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  async function setToken() {
    const token = await AsyncStorage.getItem("token");
    // if there is not token, it will be falsey value
    setLoggedIn(token);
    setLoading(false);
  }

  useEffect(() => {
    setToken();
  }, []);

  const LoadingScreen = () => (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
  const AppScreen = () => (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        initialRouteName={loggedIn ? PROFILE_SCREEN : AUTH_SCREEN}
        screenOptions={{
          animationEnabled: false,
          headerShown: false,
        }}
      >
        <Stack.Screen component={AuthScreen} name={AUTH_SCREEN} />
        <Stack.Screen component={ProfileScreen} name={PROFILE_SCREEN} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  return loading ? <LoadingScreen /> : <AppScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});