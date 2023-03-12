import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  Text,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import vegetables from "../assets/vegetables.jpg";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/AntDesign";
import { Card } from "react-native-paper";

const Offset = 400;

const IconAnimated = Animated.createAnimatedComponent(Icon);

export default function Header() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const { width } = useWindowDimensions();

  const headerBg = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, Offset],
      outputRange: ["#fff0", "#ffff"],
      extrapolate: "clamp",
    }),
  };

  const titleFont = {
    fontSize: animatedValue.interpolate({
      inputRange: [0, Offset],
      outputRange: [70, 35],
      extrapolate: "clamp",
    }),
  };
  const titleColor = {
    color: animatedValue.interpolate({
      inputRange: [0, Offset],
      outputRange: ["#FFF", "#000"],
      extrapolate: "clamp",
    }),
  };

  return (
    <View style={styles.container}>
      <StatusBar animated style={"dark"} />
      <Animated.View style={[styles.header, headerBg]}>
        <SafeAreaView style={{ flexDirection: "row", gap: 5 }}>
          <TouchableOpacity style={{ marginTop: 8 }}>
            <IconAnimated name="arrowleft" size={26} style={titleColor} />
          </TouchableOpacity>

          <Animated.Text style={[styles.title, titleFont, titleColor]}>
            Hardik
          </Animated.Text>
        </SafeAreaView>
      </Animated.View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(offsetY);
        }}
        scrollEventThrottle={16}
      >
        {/* <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          colors={["#448AFF", "#9E9E9E", "#FFEB3B", "#FF5722"]}
          style={styles.cover}
        /> */}
        <Image style={styles.cover} source={vegetables} />
        <View>
          <FlatList
            numColumns={2}
            data={Array(51)
              .fill(3)
              .map((e, i) => i)}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ flex: 1, margin: 10 }}
                onPress={() => {}}
              >
                <Card mode={"contained"}>
                  <Card.Title title="Card Title" />
                  <Card.Content>
                    <Text variant="titleLarge">{item}</Text>
                    <Text variant="bodyMedium">Card content</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    width: "100%",
    backgroundColor: "green",
    zIndex: 2,
    overflow: "visible",
    paddingHorizontal: 12,
    paddingBottom: 5,
  },
  title: {},
  cover: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
    borderBottomRightRadius: 50,
  },
});
