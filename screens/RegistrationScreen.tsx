import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../components/Input";
import { colors } from "../styles/global";
import Button from "../components/Button";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const RegistrationScreen = () => {
  const showButton = (
    <TouchableOpacity style={styles.passwordButton}>
      <Text style={[styles.showButtonText, styles.baseText]}>Показати</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.background}
      />
      <View style={styles.formContainer}>
        <View style={styles.userImageContainer}>
          <Image />
          <TouchableOpacity style={styles.buttonAdd}>
            <Image
              style={styles.buttonAddImage}
              source={require("../assets/images/plus.png")}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Реєстрація</Text>

        <View style={[styles.innerContainer, styles.inputContainer]}>
          <Input placeholder="Логін" />
          <Input placeholder="Адреса електронної пошти" />
          <Input
            placeholder="Пароль"
            rightButton={showButton}
            outherStyles={styles.positionRelative}
          />
        </View>

        <View style={[styles.innerContainer, styles.buttonContainer]}>
          <Button>
            <Text style={[styles.baseText, styles.loginButtonText]}>
              Увійти
            </Text>
          </Button>

          <View style={styles.signUpContainer}>
            <Text style={[styles.showButtonText, styles.baseText]}>
              Вже є акаунт?&nbsp;
            </Text>
            <TouchableOpacity>
              <Text style={[styles.signUpButtonText, styles.baseText]}>
                Увійти
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
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
  avoidingView: {
    flex: 1,
  },
  formContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 45,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  userImageContainer: {
    position: "absolute",
    height: 120,
    width: 120,
    borderRadius: 16,
    left: SCREEN_WIDTH * 0.5 - 60,
    top: -60,
    backgroundColor: colors.light_gray,
  },
  buttonAdd: {
    position: "absolute",
    right: -12,
    bottom: 14,
    height: 24,
    width: 24,
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAddImage: {
    width: 16,
    height: 16,
    color: colors.orange,
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
