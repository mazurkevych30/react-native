import { FlatList, StyleSheet, View } from "react-native";
import React, { FC, useState } from "react";
import PostItem, { ItemProps } from "./PostItem";

type PostProps = {
  DATA: ItemProps[];
};

const Post: FC<PostProps> = ({ DATA }) => {
  const renderItem = ({ item }: { item: ItemProps }) => {
    const { id, title, image, comments, likes, location, coordinates } = item;

    return (
      <PostItem
        id={id}
        title={title}
        image={image}
        comments={comments}
        likes={likes}
        location={location}
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
