import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { FC, useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { CreatePostParamList } from "../navigation/CreatePostNavigator";

type CameraScreenProps = StackScreenProps<CreatePostParamList, "Camera">;

const CameraScreen: FC<CameraScreenProps> = ({ navigation }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [permissionResponse, requestLibraryPermission] =
    MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      if (result) {
        setPhoto(result.uri);
      } else {
        console.log("Failed to take photo");
      }
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  const savePhoto = async () => {
    if (photo) {
      navigation.replace("CreatePost", { photo });
      if (permissionResponse && permissionResponse.status !== "granted") {
        await requestLibraryPermission();
      }

      await MediaLibrary.saveToLibraryAsync(photo);
    }
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.camera}>
          <Image
            source={{ uri: photo }}
            style={{ flex: 1 }}
            resizeMode="cover"
          />

          <View style={styles.buttonRetakePhoto}>
            <TouchableOpacity onPress={retakePhoto}>
              <Text style={styles.text}>Retake Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePhoto}>
              <Text style={styles.text}>Save Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginBottom: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  photo: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  buttonRetakePhoto: {
    position: "absolute",
    flexDirection: "row",
    gap: 60,
    alignSelf: "center",
    bottom: 64,
  },
});
