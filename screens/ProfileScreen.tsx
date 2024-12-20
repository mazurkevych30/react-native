import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileImage from "../components/ProfileImage";
import LogoutIcon from "../assets/icons/LogoutIcon";

import { selectUserInfo } from "../store/authSlice/userSelectors";
import { colors } from "../styles/global";
import { PostType } from "../types/PostType";
import { getUserPosts, updateUserAvatar } from "../utils/firestore";
import Post from "../components/Post";
import { logout } from "../utils/auth";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const ProfileScreen = () => {
  const userInfo = useSelector(selectUserInfo);
  const [photoURL, setPhotoURL] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [posts, setPosts] = useState<PostType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.photoURL) {
      setPhotoURL(userInfo.photoURL);
    }
    if (userInfo?.uid) {
      setUser(userInfo.uid);
    }

    getPosts();
  }, []);

  const getPosts = async () => {
    if (userInfo?.uid) {
      const res = await getUserPosts(userInfo?.uid);
      if (res) {
        setPosts(res);
      }
    }
  };

  const handlerUpdatePhoto = (uid: string, photo: string) => {
    updateUserAvatar(uid, photo, dispatch);
  };

  const onLogout = async () => {
    await logout(dispatch);
  };

  return (
    <View style={styles.baseContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.container}>
        <ProfileImage
          containerStyles={styles.userImageContainer}
          selectedImage={photoURL}
          setSelectedImage={setPhotoURL}
          user={user}
          handlerUpdatePhoto={handlerUpdatePhoto}
        />
        <LogoutIcon style={styles.positionLogout} onPress={() => onLogout()} />
        <Text style={styles.title}>{userInfo?.displayName}</Text>
        <Post DATA={posts} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    height: "80%",
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
    color: colors.black_primary,
  },
  userImageContainer: {
    position: "absolute",
    left: SCREEN_WIDTH * 0.5 - 60,
    top: -60,
  },
  positionLogout: {
    position: "absolute",
    right: 16,
    top: 22,
  },
});
