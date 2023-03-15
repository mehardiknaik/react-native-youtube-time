import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../component/Header";
import { Card, Text } from "react-native-paper";
import data from "../data/data";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { navigate } = useNavigation();
  return (
    <Header title="Lets Go">
      <Image
        style={styles.cover}
        source={require("../assets/vegetables.jpg")}
      />
      <View>
        <FlatList
          numColumns={2}
          data={data}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ flex: 1, margin: 10, maxWidth: "50%" }}
              onPress={() => {
                navigate("Detail", item);
              }}
            >
              <Card mode={"contained"}>
                <Card.Title title={item.title} />
                <Image source={item.uri} style={styles.itemImage} />
                <Card.Content>
                  <Text>Price: {item.Price}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      </View>
    </Header>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cover: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    borderBottomRightRadius: 50,
  },
  itemImage: [
    {
      width: "50%",
      height: "auto",
      aspectRatio: 1,
      position: "absolute",
      top: -20,
      right: 0,
    },
  ],
});
