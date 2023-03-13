import { ImageBackground, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../component/Header";

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
            
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 0},
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
      <Text>DetailScreen</Text>
    </Header>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  cover: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },
});
