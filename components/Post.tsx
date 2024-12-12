import { FlatList, StyleSheet, View } from "react-native";
import React, { FC, useState } from "react";
import { ItemData } from "../screens/PostsScreen";
import PostItem from "./PostItem";

type PostProps = {
  DATA: ItemData[];
};

const Post: FC<PostProps> = ({ DATA }) => {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <PostItem
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedId}
      ItemSeparatorComponent={() => <View style={{ height: 32 }}></View>}
    />
  );
};

export default Post;

const styles = StyleSheet.create({});
