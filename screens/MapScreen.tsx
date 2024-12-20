import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StackParamList } from "../navigation/StackNavigator";
import { Coords } from "./CreatePostsScreen";

export type MapScreenProps = StackScreenProps<StackParamList, "Map">;

const google_api_key = "key";

const MapScreen: FC<MapScreenProps> = ({ route }) => {
  const params = route?.params;
  const [coordinates, setCoordinates] = useState<Coords>();
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    if (!params?.coordinates && !params?.title) return;
    setTitle(params.title);
    setCoordinates(params.coordinates);
  }, [params]);
  return (
    <View style={styles.container}>
      {coordinates ? (
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          googleMapId={google_api_key}
          region={{
            latitude: coordinates?.latitude,
            longitude: coordinates?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="standard"
          minZoomLevel={15}
          onMapReady={() => console.log("Map is ready")}
          onRegionChange={() => console.log("Region change")}
        >
          <Marker
            title={title}
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }}
          />
        </MapView>
      ) : (
        <Text style={{ textAlign: "center" }}>...Loading</Text>
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});
