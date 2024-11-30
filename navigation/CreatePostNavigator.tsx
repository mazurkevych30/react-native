import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreatePostsScreen from "../screens/CreatePostsScreen";

const Stack = createStackNavigator();

const CreatePostNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CreatePost"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CreatePost" component={CreatePostsScreen} />
    </Stack.Navigator>
  );
};

export default CreatePostNavigator;
