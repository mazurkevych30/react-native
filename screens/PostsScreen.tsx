import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { colors } from "../styles/global";
import Post from "../components/Post";
import { selectUserInfo } from "../store/authSlice/userSelectors";
import { getPosts } from "../utils/firestore";
import { PostType } from "../types/PostType";

const PostsScreen = () => {
  const userInfo = useSelector(selectUserInfo);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    handlerGetPosts();
  }, []);

  const handlerGetPosts = async () => {
    const res = await getPosts();
    if (res) {
      setPosts(res);
    }
  };

  return (
    <View style={styles.baseContainer}>
      <View style={styles.infoContainer}>
        <Image
          source={
            userInfo?.photoURL
              ? { uri: userInfo?.photoURL }
              : require("../assets/images/icon.png")
          }
          style={styles.infoImage}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.text}>{userInfo?.displayName}</Text>
          <Text style={styles.emailText}>{userInfo?.email}</Text>
        </View>
      </View>
      <Post DATA={posts} />
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
