import { FC } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { colors } from "../styles/global";

type buttonProps = {
  children: React.ReactNode;
  buttonStyle?: ViewStyle;
};

const Button: FC<buttonProps> = ({ children, buttonStyle }) => {
  return (
    <View>
      <TouchableOpacity style={[styles.button, buttonStyle]}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});
