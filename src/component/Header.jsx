import React, { useRef, useState } from "react";
// import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Text,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { AntDesign as Icon, Entypo } from "@expo/vector-icons";
import { Menu, Divider } from "react-native-paper";
import { useData } from "../context/DataProvider";

const Offset = 400;

const IconAnimated = Animated.createAnimatedComponent(Icon);
const EntypoAnimated = Animated.createAnimatedComponent(Entypo);

export default function Header({ title, children }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const { width } = useWindowDimensions();
  const { name } = useRoute();
  const navigation = useNavigation();

  const theme = useTheme();

  // console.log(theme);

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
          outputRange: [380, -5],
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
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={"light-content"}
        animated
      />
      <Animated.View style={[styles.header, headerBg]}>
        <SafeAreaView
          style={{
            flexDirection: "row",
            gap: 5,
            marginTop: 8,
          }}
        >
          {name == "Home" ? (
            <Image
              style={{ height: 45, aspectRatio: 1, width: "auto" }}
              source={require("../../assets/icon.png")}
            />
          ) : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconAnimated name={"arrowleft"} size={26} style={titleColor} />
            </TouchableOpacity>
          )}

          {name == "Home" ? (
            <Animated.Text style={[styles.title, titleFont, titleColor]}>
              {title}
            </Animated.Text>
          ) : (
            <Animated.Text style={[styles.title, featureNameAnimation]}>
              {title}
            </Animated.Text>
          )}
          <MenuComp style={titleColor} />
        </SafeAreaView>
      </Animated.View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y;
          animatedValue.setValue(offsetY);
          if (offsetY < Offset / 2) {
            StatusBar.setBarStyle("light-content");
          } else {
            StatusBar.setBarStyle("dark-content");
          }
        }}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const MenuComp = ({ style }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const { dispatch, theme } = useData();

  const changeTheme = () => {
    dispatch({ type: "theme", payload: theme === "light" ? "dark" : "light" });
  };
  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <EntypoAnimated
              name={"dots-three-vertical"}
              size={20}
              style={style}
            />
          </TouchableOpacity>
        }
      >
        <Menu.Item
          onPress={changeTheme}
          title={theme === "light" ? "Dark Mode" : "Light Mode"}
        />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </View>
  );
};

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
    minHeight: 80,
    paddingBottom: 5,
  },
  title: {
    fontSize: 30,
    flex: 1,
  },
});
