import { StyleSheet, TextInput, View, ViewProps } from "react-native";
import React, { FC, ReactNode, useState } from "react";

import { colors } from "../styles/global";

type inputProps = {
  value: string;
  placeholder?: string;
  otherStyles?: ViewProps["style"];
  rightButton?: ReactNode;
  onTextChange: (value: string) => void;
  secureTextEntry?: boolean;
};

const Input: FC<inputProps> = ({
  value,
  onTextChange,
  placeholder,
  otherStyles,
  rightButton,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.container, isFocused && styles.focused, otherStyles]}>
      <TextInput
        style={[styles.input, styles.baseText]}
        value={value}
        placeholder={placeholder}
        onChangeText={onTextChange}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
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
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
});
