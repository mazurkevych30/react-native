import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreatePostsScreen from "../screens/CreatePostsScreen";
import CameraScreen from "../screens/CameraScreen";

export type CreatePostParamList = {
  CreatePost: { photo?: string };
  Camera: undefined;
  Post: undefined;
};

const Stack = createStackNavigator();

const CreatePostNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CreatePost"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="CreatePost"
        component={CreatePostsScreen as React.FC}
      />
      <Stack.Screen name="Camera" component={CameraScreen as React.FC} />
    </Stack.Navigator>
  );
};

export default CreatePostNavigator;
