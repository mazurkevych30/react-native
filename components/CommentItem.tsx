import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../store/authSlice/userSelectors";

type CommentItemProps = {
  user: string;
  text: string;
  date: string;
};

const CommentItem = ({ user, text, date }: CommentItemProps) => {
  const userInfo = useSelector(selectUserInfo);
  return (
    <View
      style={[
        styles.container,
        userInfo?.uid == user && { flexDirection: "row-reverse" },
      ]}
    >
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.userImage}
      />
      <View
        style={[
          styles.item,
          user === "Owner" ? styles.ownerItemBorder : styles.itemBorder,
        ]}
      >
        <Text>{text}</Text>
        <Text style={[{ textAlign: "right" }]}>{date}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  userImage: {
    height: 28,
    width: 28,
    borderRadius: 50,
  },
  item: {
    flex: 1,
    padding: 16,
    gap: 8,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  itemBorder: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  ownerItemBorder: {
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
});
