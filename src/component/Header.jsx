import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

const Offset = 400;

const IconAnimated = Animated.createAnimatedComponent(Icon);

export default function Header({ title, children }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const { width } = useWindowDimensions();
  const { name } = useRoute();
  const navigation = useNavigation();

  const theme = useTheme();

  console.log(theme);

  const headerBg = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, Offset],
      outputRange: ["#fff0", "#ffff"],
      extrapolate: "clamp",
      useNativeDriver: true,
    }),
  };

  const titleFont = {
    fontSize: animatedValue.interpolate({
      inputRange: [0, Offset],
      outputRange: [70, 35],
      extrapolate: "clamp",
      useNativeDriver: true,
    }),
  };
  const titleColor = {
    color: animatedValue.interpolate({
      inputRange: [0, Offset],
      outputRange: ["#FFF", "#000"],
      extrapolate: "clamp",
      useNativeDriver: true,
    }),
  };

  const featureNameAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, Offset],
          outputRange: [380, 4],
          extrapolate: "clamp",
          useNativeDriver: true,
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [350, Offset],
          outputRange: [-35, 0],
          extrapolate: "clamp",
          useNativeDriver: true,
        }),
      },
    ],
    color: animatedValue.interpolate({
      inputRange: [350, Offset],
      outputRange: ["#FFF", "#000"],
      extrapolate: "clamp",
      useNativeDriver: true,
    }),
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <StatusBar animated style={"dark"} />
      <Animated.View style={[styles.header, headerBg]}>
        <SafeAreaView style={{ flexDirection: "row", gap: 5 }}>
          {name == "Home" ? (
            <Image
              style={{ height: 45, aspectRatio: 1, width: "auto" }}
              source={require("../../assets/icon.png")}
            />
          ) : (
            <TouchableOpacity
              style={{ marginTop: 8 }}
              onPress={() => navigation.goBack()}
            >
              <IconAnimated name="arrowleft" size={26} style={titleColor} />
            </TouchableOpacity>
          )}

          {name == "Home" ? (
            <Animated.Text style={[styles.title, titleFont, titleColor]}>
              {title}
            </Animated.Text>
          ) : (
            <Animated.Text
              style={[
                styles.title,
                featureNameAnimation
              ]}
            >
              {title}
            </Animated.Text>
          )}
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
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  header: {
    position: "absolute",
    width: "100%",
    backgroundColor: "green",
    zIndex: 2,
    overflow: "visible",
    paddingHorizontal: 12,
    paddingBottom: 5,
    minHeight:80
  },
  title: {
    fontSize:30
  },
});
