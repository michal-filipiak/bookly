import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/loginScreen/loginScreen";
import Flatly from "./components/flatly/flatly";
import Parkly from "./components/parkly/parkly";
import Carly from "./components/carly/carly";
import RegisterScreen from "./components/registerScreen/registerScreen";
import FlashMessage from "react-native-flash-message";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CarDetails from "./components/carly/carDetails";
import FlatDetails from "./components/flatly/flatDetails";
import ParkingDetails from "./components/parkly/parkingDetails";
import Booked from "./components/booked/booked";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [token, setToken] = React.useState("");

  function menuTabs() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Parkly" component={Parkly} initialParams={{ token: token }}/>
        <Tab.Screen name="Flatly" component={Flatly} initialParams={{ token: token }}/>
        <Tab.Screen name="Carly" component={Carly} initialParams={{ token: token }}/>
        <Tab.Screen name="Booked" component={Booked} initialParams={{ token: token }}/>
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <FlashMessage position="top" floating={true} />
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "Login" }}
          initialParams={{ setToken: setToken }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ title: "Create Account" }}
        />
        <Stack.Screen
          name="Logged"
          component={menuTabs}
          options={{ title: "", headerBackTitle: "Logout" }}
        />
        <Stack.Screen
          name="CarDetails"
          component={CarDetails}
          options={{ title: "", headerBackTitle: "Go back from Details" }}
        />
        <Stack.Screen
          name="FlatDetails"
          component={FlatDetails}
          options={{ title: "", headerBackTitle: "Go back from Details" }}
        />
        <Stack.Screen
          name="ParkingDetails"
          component={ParkingDetails}
          options={{ title: "", headerBackTitle: "Go back from Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    margin: 20,
    fontSize: 18,
  },
});
