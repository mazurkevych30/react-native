import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../styles/global";
import Post from "../components/Post";
import { posts_data } from "../data/posts_data";

const PostsScreen = () => {
  return (
    <View style={styles.baseContainer}>
      <View style={styles.infoContainer}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.infoImage}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.text}>Natali Romanova</Text>
          <Text style={styles.emailText}>email@example.com</Text>
        </View>
      </View>
      {/* <ScrollView>posts list</ScrollView> */}
      <Post DATA={posts_data} />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 32,
  },
  text: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: colors.black_primary,
  },
  emailText: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: colors.black_light,
  },
  infoImage: {
    height: 60,
    width: 60,
    borderRadius: 16,
  },
});
