import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Coords } from "../screens/CreatePostsScreen";
import { colors } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigation/StackNavigator";

export type CommentType = {
  user: string;
  text: string;
};

export type ItemProps = {
  id: string;
  coordinates?: Coords;
  image?: ImageSourcePropType;
  title: string;
  comments: CommentType[];
  likes?: number;
  location?: string;
  onButtonPress?: () => void;
};

type NavigationProp = StackNavigationProp<StackParamList, "Map">;

const PostItem: FC<ItemProps> = ({
  id,
  image,
  title,
  comments,
  likes,
  location,
  coordinates,
  onButtonPress,
}) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.innerbtnContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Comments", { id })}
          >
            <Ionicons
              name={comments.length > 0 ? "chatbubble" : "chatbubble-outline"}
              size={24}
              style={
                comments.length > 0 ? styles.chatbubble : styles.chatbubbleDef
              }
            />
            <Text style={styles.text}>{comments.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Ionicons
              name="thumbs-up-outline"
              size={24}
              style={styles.chatbubble}
            />
            <Text style={styles.text}>{likes}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Map", { coordinates, title })}
        >
          <Ionicons
            name="location-outline"
            size={24}
            style={styles.chatbubbleDef}
          />
          <Text style={[styles.text, { textDecorationLine: "underline" }]}>
            {location?.split(",")[1]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  item: {
    padding: 20,
  },
  title: {
    fontFamily: "Roboto-Regular",
    fontWeight: "500",
    fontSize: 16,
    color: colors.black_primary,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: colors.black_primary,
  },
  container: {
    gap: 8,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerbtnContainer: {
    flexDirection: "row",
    gap: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 6,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  chatbubbleDef: {
    color: colors.text_gray,
  },
  chatbubble: {
    color: colors.orange,
  },
});
