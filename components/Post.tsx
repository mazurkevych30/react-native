import { FlatList, StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { PostType } from "../types/PostType";
import PostItem from "./PostItem";

type PostProps = {
  DATA: PostType[];
};

const Post: FC<PostProps> = ({ DATA }) => {
  const renderItem = ({ item }: { item: PostType }) => {
    const { id, title, photoURL, comments, likes, country, coordinates, user } =
      item;

    return (
      <PostItem
        id={id}
        user={user}
        title={title}
        photoURL={photoURL}
        comments={comments}
        likes={likes}
        country={country}
        coordinates={coordinates}
      />
    );
  };

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 32 }}></View>}
    />
  );
};

export default Post;

const styles = StyleSheet.create({});
