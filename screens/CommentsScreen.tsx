import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../navigation/StackNavigator";
import { posts_data } from "../data/posts_data";
import { CommentType, ItemProps } from "../components/PostItem";
import Input from "../components/Input";
import { colors } from "../styles/global";
import CommentItem from "../components/CommentItem";

export type CommentsScreenProps = StackScreenProps<StackParamList, "Comments">;

const CommentsScreen: FC<CommentsScreenProps> = ({ route }) => {
  const params = route?.params;
  const [comment, setComment] = useState<ItemProps>();
  const [commentText, setCommentText] = useState<string>("");

  useEffect(() => {
    if (!params?.id) return;
    const res = posts_data.find(({ id }) => id === params.id);
    setComment(res);
  }, [params]);

  const showButton = (
    <TouchableOpacity style={styles.shownButton}>
      <Ionicons name="arrow-up" size={24} color={colors.white} />
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: CommentType }) => {
    const { user, text } = item;

    return <CommentItem user={user} text={text} date="2024.12.12 19:00" />;
  };

  return (
    <View style={{ flex: 1 }}>
      {comment ? (
        <View style={styles.container}>
          <Image source={comment.image} style={styles.image} />
          <FlatList
            data={comment.comments}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ height: 24 }}></View>}
          />
          <Input
            placeholder="Коментувати..."
            rightButton={showButton}
            value={commentText}
            otherStyles={styles.input}
            onTextChange={(text) => setCommentText(text)}
          />
        </View>
      ) : (
        <Text style={{ textAlign: "center" }}>...Loading</Text>
      )}
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  shownButton: {
    position: "absolute",
    top: 8,
    right: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: colors.orange,
    height: 34,
    width: 34,
  },
  input: { borderRadius: 50 },
});
