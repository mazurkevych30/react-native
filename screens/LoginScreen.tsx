import {
  Alert,
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";

import { colors } from "../styles/global";

import Input from "../components/Input";
import Button from "../components/Button";
import validateEmail from "../utils/validateEmailUtils";

type Data = {
  email: string;
  password: string;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const LoginScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);
  const [formData, setFormData] = useState<Data>({
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string): void => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onLogin = () => {
    const { email, password } = formData;

    if (!email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля.");
    } else if (!validateEmail(email)) {
      Alert.alert(
        "Помилка",
        "Будь ласка, введіть електрону адресу у форматі example@gmail.com."
      );
    } else {
      Alert.alert("Credentials", `${email} + ${password}`);
    }
  };

  const onSignUp = () => {
    console.log("Sign up!");
  };

  const showButton = (
    <TouchableOpacity style={styles.passwordButton} onPress={showPassword}>
      <Text style={[styles.showButtonText, styles.baseText]}>Показати</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.baseContainer}>
        <ImageBackground
          source={require("../assets/images/background.png")}
          resizeMode="cover"
          style={styles.image}
        />

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Увійти</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={formData.email}
                placeholder="Адреса електронної пошти"
                onTextChange={(text) => handleChange("email", text)}
              />
              <Input
                value={formData.password}
                placeholder="Пароль"
                onTextChange={(text) => handleChange("password", text)}
                rightButton={showButton}
                otherStyles={styles.positionRelative}
                secureTextEntry={isPasswordVisible}
              />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onLogin}>
                <Text style={[styles.baseText, styles.loginButtonText]}>
                  Увійти
                </Text>
              </Button>

              <View style={styles.signUpContainer}>
                <Text style={[styles.showButtonText, styles.baseText]}>
                  Немає акаунту?&nbsp;
                </Text>
                <TouchableOpacity onPress={onSignUp}>
                  <Text style={[styles.signUpButtonText, styles.baseText]}>
                    Зареєструватися
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  formContainer: {
    width: SCREEN_WIDTH,
    height: "50%",
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
    color: colors.black_primary,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  showButtonText: {
    color: colors.blue,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  signUpButtonText: {
    color: colors.blue,
    textDecorationLine: "underline",
  },
  passwordButton: {
    position: "absolute",
    right: 16,
    top: 15,
  },
  positionRelative: {
    position: "relative",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
