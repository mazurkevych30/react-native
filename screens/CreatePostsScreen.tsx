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
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/global";
import Input from "../components/Input";
import Button from "../components/Button";
import { StackScreenProps } from "@react-navigation/stack";
import { CreatePostParamList } from "../navigation/CreatePostNavigator";

type CreatePostsScreenProps = StackScreenProps<
  CreatePostParamList,
  "CreatePost"
>;

const CreatePostsScreen: FC<CreatePostsScreenProps> = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View>
          <View style={styles.emptyImgContainer}>
            <TouchableOpacity
              style={styles.cameraContainer}
              onPress={() => {
                navigation.navigate("Camera");
              }}
            >
              <Ionicons name="camera" size={24} color={colors.text_gray} />
            </TouchableOpacity>
            <Image />
          </View>
          <TouchableOpacity>
            <Text style={[styles.baseText, styles.buttonDownload]}>
              Завантажте фото
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 16 }}>
          <Input placeholder="Назва..." otherStyles={styles.input} />
          <Input placeholder="Місцевість..." otherStyles={styles.input} />
        </View>

        <Button>
          <Text style={[styles.buttonText, styles.baseText]}>Опубліковати</Text>
        </Button>

        <TouchableOpacity style={styles.trashBatton}>
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
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
  },
  emptyImgContainer: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
    alignItems: "center",
    justifyContent: "center",
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
