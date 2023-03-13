import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";

const Offset = 400;

const IconAnimated = Animated.createAnimatedComponent(Icon);

export default function Header({ title, children }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const { width } = useWindowDimensions();
  const { name } = useRoute();
  const navigation = useNavigation();

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
          {name !=="Home"&&<TouchableOpacity
            style={{ marginTop: 8 }}
            onPress={() => navigation.goBack()}
          >
            <IconAnimated name="arrowleft" size={26} style={titleColor} />
          </TouchableOpacity>}

          <Animated.Text style={[styles.title, titleFont, titleColor]}>
            {title}
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
        {children}
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
});
