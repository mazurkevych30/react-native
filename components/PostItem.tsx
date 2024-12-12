import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { ItemData } from "../screens/PostsScreen";

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const PostItem: FC<ItemProps> = ({
  item,
  onPress,
  backgroundColor,
  textColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    // marginBottom: 32,
  },
  title: {
    fontSize: 32,
  },
});
