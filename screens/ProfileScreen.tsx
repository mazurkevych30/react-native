import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { colors } from "../styles/global";
import ProfileImage from "../components/ProfileImage";
import LogoutIcon from "../assets/icons/LogoutIcon";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const ProfileScreen = () => {
  return (
    <View style={styles.baseContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.container}>
        <ProfileImage containerStyles={styles.userImageContainer} />
        <LogoutIcon
          style={styles.positionLogout}
          onPress={() => console.log("logout")}
        />
        <Text style={styles.title}>Natali Romanova</Text>
        <ScrollView>{/* posts list */}</ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    height: "80%",
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
    color: colors.black_primary,
  },
  userImageContainer: {
    position: "absolute",
    left: SCREEN_WIDTH * 0.5 - 60,
    top: -60,
  },
  positionLogout: {
    position: "absolute",
    right: 16,
    top: 22,
  },
});
