import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../styles/global";
import Post from "../components/Post";

export type ItemData = {
  coordinates?: coordType;
  image?: ImageSourcePropType;
  title: string;
  countComments: number;
  countLikes?: number;
  country?: string;
  onButtonPress: () => void;
};

const DATA: ItemData[] = [
  {
    postImage: require("../assets/images/forrest_image.jpg"),
    title: "Ліс",
    count_comments: 8,
    likes: 153,
    location: "Ivano-Frankivs'k Region, Ukraine",
    country: "Ukraine",
    coordinates: { latitude: 48.72677, longitude: 24.54586 },
  },
  {
    postImage: require("../assets/images/ContentBlock.png"),
    title: "Захід на Чорному морі",
    count_comments: 3,
    likes: 200,
    location: "Odessa, Ukraine",
    country: "Ukraine",
    coordinates: { latitude: 46.466325, longitude: 30.762716 },
  },
  {
    postImage: require("../assets/images/forrest_image.jpg"),
    title: "Старий будиночок у Венеції",
    count_comments: 50,
    likes: 200,
    country: "Italy",
    location: "Venezia, Italy",
    coordinates: { latitude: 45.437384, longitude: 12.32781 },
  },
];

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
      <Post DATA={DATA} />
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
