import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import DataProvider, { useData } from "./src/context/DataProvider";
import ThemeProvider from "./src/context/ThemeProvider";

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        </ThemeProvider>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
