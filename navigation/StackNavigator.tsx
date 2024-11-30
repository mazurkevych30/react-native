import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  Registration: undefined;
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={BottomTabNavigator as React.FC} />
      <Stack.Screen name="Login" component={LoginScreen as React.FC} />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen as React.FC}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
