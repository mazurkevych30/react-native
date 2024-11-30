import { Image, StyleSheet, View, ViewProps } from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/global";

type ProfileImageProps = {
  containerStyles: ViewProps["style"];
};

const ProfileImage: FC<ProfileImageProps> = ({ containerStyles }) => {
  return (
    <View style={[styles.userImageContainer, containerStyles]}>
      <Image />
      <Ionicons
        name="close-circle-outline"
        size={24}
        color={colors.border_gray}
        style={styles.buttonAdd}
        onPress={() => {
          console.log("image");
        }}
      />
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  userImageContainer: {
    height: 120,
    width: 120,
    borderRadius: 16,
    backgroundColor: colors.light_gray,
  },
  buttonAdd: {
    position: "absolute",
    right: -12,
    bottom: 14,
  },
});
