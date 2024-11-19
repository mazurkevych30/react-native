import { StyleSheet, Text, TextInput, View, ViewProps } from "react-native";
import React, { FC, ReactNode } from "react";
import { colors } from "../styles/global";

type inputProps = {
  placeholder?: string;
  outherStyles?: ViewProps["style"];
  rightButton?: ReactNode;

  secureTextEntry?: boolean;
};

const Input: FC<inputProps> = ({
  placeholder,
  outherStyles,
  rightButton,
  secureTextEntry = false,
}) => {
  return (
    <View style={[styles.container, outherStyles]}>
      <TextInput
        style={[styles.input, styles.baseText]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
      {rightButton}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 16,
  },
  container: {
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: colors.black_primary,
  },
});
