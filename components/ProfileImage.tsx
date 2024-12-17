import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import React, { FC } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/global";

type ProfileImageProps = {
  containerStyles: ViewProps["style"];
  selectedImage: string;
  setSelectedImage: (state: string) => void;
  user?: string;
  handlerUpdatePhoto?: (uid: string, photo: string) => void;
};

const ProfileImage: FC<ProfileImageProps> = ({
  containerStyles,
  selectedImage,
  setSelectedImage,
  user = "",
  handlerUpdatePhoto,
}) => {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      if (user) {
        handlerUpdatePhoto?.(user, result.assets[0].uri);
      }
    }
  };

  const deleteImage = () => {
    setSelectedImage("");
    handlerUpdatePhoto?.(user, "");
  };

  return (
    <View style={[styles.userImageContainer, containerStyles]}>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => {
          selectedImage ? deleteImage() : pickImage();
        }}
      >
        <Ionicons
          name={selectedImage ? "close-circle-outline" : "add-circle-outline"}
          size={24}
          color={selectedImage ? colors.border_gray : colors.orange}
        />
      </TouchableOpacity>
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
  image: {
    height: 120,
    width: 120,
    borderRadius: 16,
  },
  buttonAdd: {
    height: 24,
    width: 24,
    position: "absolute",
    right: -12,
    bottom: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
