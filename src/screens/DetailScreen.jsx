import { ImageBackground, Image, StyleSheet, View } from "react-native";
import React from "react";
import Header from "../component/Header";
import { Card, Surface, Text } from "react-native-paper";
import { FlatList } from "react-native";

const DetailScreen = ({ route: { params } }) => {
  return (
    <Header title={params.title}>
      <ImageBackground
        style={styles.cover}
        source={require("../assets/detailsBg.jpg")}
      >
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            height: "100%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 1,
          }}
        >
          <Image
            source={params.uri}
            style={{
              height: 200,
              width: "auto",
              aspectRatio: 1,
              shadowColor: "#fff",
              shadowRadius: 5,
            }}
          />
        </View>
      </ImageBackground>
      <View style={{ marginHorizontal: 10, marginTop: 60 }}>
        <Text>Details Screen</Text>
      </View>
      <FlatList
        data={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25,
        ]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item}</Text>
          </View>
        )}
        hea
        scrollEnabled={false}
      />
    </Header>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  cover: {
    width: "100%",
    height: 400,
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },
});
