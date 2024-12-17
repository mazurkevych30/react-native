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

import Input from "../components/Input";
import { colors } from "../styles/global";
import CommentItem from "../components/CommentItem";
import { CommentType } from "../types/CommentType";
import { getPost, updatePostComment } from "../utils/firestore";
import { getPostType } from "../types/PostType";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../store/authSlice/userSelectors";

export type CommentsScreenProps = StackScreenProps<StackParamList, "Comments">;

const CommentsScreen: FC<CommentsScreenProps> = ({ route }) => {
  const userInfo = useSelector(selectUserInfo);
  const params = route?.params;
  const [comment, setComment] = useState<getPostType>();
  const [commentText, setCommentText] = useState<string>("");
  useEffect(() => {
    if (!params?.id) return;
    handletGetData();
  }, [params]);

  const handletGetData = async () => {
    const res = await getPost(params.id);
    if (res) {
      setComment(res);
    }
  };

  const handlerAddComment = () => {
    if (userInfo?.uid && commentText) {
      updatePostComment(params.id, userInfo.uid, commentText);
      setCommentText("");
      handletGetData();
    }
  };

  const showButton = (
    <TouchableOpacity
      style={styles.shownButton}
      onPress={() => handlerAddComment()}
    >
      <Ionicons name="arrow-up" size={24} color={colors.white} />
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: CommentType }) => {
    const { uid, text, date_comment } = item;
    const milliseconds =
      date_comment.seconds * 1000 + date_comment.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    return <CommentItem user={uid} text={text} date={date.toLocaleString()} />;
  };

  return (
    <View style={{ flex: 1 }}>
      {comment ? (
        <View style={styles.container}>
          <Image source={{ uri: comment.photoURL }} style={styles.image} />
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
