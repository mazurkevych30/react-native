import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import CreatePostNavigator from "./CreatePostNavigator";

import PostsScreen from "../screens/PostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { colors } from "../styles/global";
import { StyleSheet, Text } from "react-native";
import LogoutIcon from "../assets/icons/LogoutIcon";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [activeTab, setActiveTab] = useState<string>("Post");

  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={() => ({
        headerShadowVisible: true,
        headerStyle: {
          backgroundColor: colors.white,
          shadowColor: colors.black_primary,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 5,
        },

        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: styles.tabBarItem,
        headerTitleAlign: "center",
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        sceneStyle: { backgroundColor: colors.white },
      })}
      screenListeners={({ route }) => ({
        tabPress: () => setActiveTab(route.name),
      })}
    >
      <Tab.Screen
        name="Post"
        component={PostsScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text style={styles.headerTitle}>Публікації</Text>,
          headerRight: () => (
            <LogoutIcon onPress={() => navigation.navigate("Login")} />
          ),
          tabBarIcon: () => <Ionicons name="grid-outline" size={24} />,
        })}
      />
      {activeTab === "Post" ? (
        <>
          <Tab.Screen
            name="CreatePostStack"
            component={CreatePostNavigator}
            options={({ navigation }) => ({
              headerTitle: () => (
                <Text style={styles.headerTitle}>Створити публікацію</Text>
              ),
              tabBarIcon: () => (
                <Ionicons name="add" size={24} color={colors.white} />
              ),
              headerLeft: () => (
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colors.black_primary}
                  onPress={() => navigation.goBack()}
                />
              ),
              tabBarStyle: { display: "none" },
              tabBarItemStyle: {
                backgroundColor: colors.orange,
                flex: 0,
                width: 70,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 5,
              },
            })}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={({}) => ({
              headerShown: false,
              tabBarIcon: () => <Ionicons name="person-outline" size={24} />,
            })}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={({}) => ({
              headerShown: false,
              tabBarIcon: () => (
                <Ionicons
                  name="person-outline"
                  size={24}
                  color={colors.white}
                />
              ),
              tabBarItemStyle: {
                backgroundColor: colors.orange,
                flex: 0,
                width: 70,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 5,
              },
            })}
          />
          <Tab.Screen
            name="CreatePostStack"
            component={CreatePostNavigator}
            options={({ navigation }) => ({
              headerTitle: () => (
                <Text style={styles.headerTitle}>Створити публікацію</Text>
              ),
              tabBarIcon: () => <Ionicons name="add" size={24} />,
              headerLeft: () => (
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colors.black_primary}
                  onPress={() => navigation.goBack()}
                />
              ),
              tabBarStyle: { display: "none" },
            })}
          />
        </>
      )}
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: colors.black_primary,
  },
  tabBarStyle: {
    height: 71,
    paddingTop: 9,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    shadowColor: colors.black_primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  tabBarItem: {
    flex: 0,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});
