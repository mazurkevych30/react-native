import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { CreatePostParamList } from "../navigation/CreatePostNavigator";
import Input from "../components/Input";
import Button from "../components/Button";

import { colors } from "../styles/global";

type CreatePostsScreenProps = StackScreenProps<
  CreatePostParamList,
  "CreatePost"
>;

type Data = {
  title: string;
  address: string;
};

type Coords = {
  latitude: number;
  longitude: number;
};

const CreatePostsScreen: FC<CreatePostsScreenProps> = ({
  navigation,
  route,
}) => {
  const params = route?.params;
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [location, setLocation] = useState<Coords | null>(null);
  const [formData, setFormData] = useState<Data>({
    title: "",
    address: "",
  });

  useEffect(() => {
    if (!params?.photo) return;

    setSelectedImage(params.photo);
  }, [params]);

  const handleChange = (key: string, value: string): void => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setLocation(coords);
  };

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
    }
  };

  const onClearData = () => {
    setSelectedImage("");
    setLocation(null);
    setFormData({
      title: "",
      address: "",
    });
  };

  const onPublic = () => {
    getCurrentLocation();
    //Передача данних у бд

    onClearData();
    navigation.navigate("Post");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View>
          <View style={styles.emptyImgContainer}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={{ flex: 1, width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            )}
            <TouchableOpacity
              style={[
                styles.cameraContainer,
                selectedImage && styles.cameraActiveContainer,
              ]}
              onPress={() => {
                navigation.navigate("Camera");
              }}
            >
              <Ionicons
                name="camera"
                size={24}
                color={selectedImage ? colors.white : colors.text_gray}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={pickImage}>
            <Text style={[styles.baseText, styles.buttonDownload]}>
              {selectedImage ? "Редагувати фото" : "Завантажте фото"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 16 }}>
          <Input
            placeholder="Назва..."
            otherStyles={styles.input}
            value={formData.title}
            onTextChange={(text) => handleChange("title", text)}
          />
          <Input
            placeholder="Місцевість..."
            otherStyles={[styles.input, styles.addressInput]}
            rightButton={
              <Ionicons
                name="location-outline"
                size={24}
                color={colors.text_gray}
                style={{ position: "absolute", bottom: 13, left: 16 }}
              />
            }
            value={formData.address}
            onTextChange={(text) => handleChange("address", text)}
          />
        </View>

        <Button onPress={onPublic}>
          <Text style={[styles.buttonText, styles.baseText]}>Опубліковати</Text>
        </Button>

        <TouchableOpacity style={styles.trashBatton} onPress={onClearData}>
          <Ionicons name="trash-outline" size={24} color={colors.text_gray} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  imageContainer: { gap: 8 },
  cameraContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
  },
  cameraActiveContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.30)",
  },
  emptyImgContainer: {
    position: "relative",
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
    alignItems: "center",
    justifyContent: "center",
  },
  addressInput: {
    paddingLeft: 30,
  },
  input: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: colors.white,
  },
  baseText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18,
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
  buttonDownload: {
    color: colors.text_gray,
  },
  trashBatton: {
    position: "absolute",
    bottom: "6%",
    alignSelf: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.light_gray,
    justifyContent: "center",
    alignItems: "center",
  },
});
