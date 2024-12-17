import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import MapScreen from "../screens/MapScreen";
import { Coords } from "../screens/CreatePostsScreen";
import CommentsScreen from "../screens/CommentsScreen";
import { colors } from "../styles/global";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Stack = createStackNavigator();

export type StackParamList = {
  Home: undefined;
  Login: undefined;
  Registration: undefined;
  Map: { coordinates: Coords | undefined; title: string };
  Comments: { id: string };
};

const StackNavigator = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        cardStyle: { backgroundColor: colors.white },
      }}
    >
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator as React.FC}
          />

          <Stack.Screen name="Map" component={MapScreen as React.FC} />
          <Stack.Screen
            name="Comments"
            component={CommentsScreen as React.FC}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colors.black_primary}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerShown: true,
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen as React.FC} />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen as React.FC}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
