import React from "react";
import {
  MD3LightTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { useData } from "./DataProvider";
const darkTheme = {
  ...MD3DarkTheme,
};
const lightTheme = {
  ...MD3LightTheme,
};
const ThemeProvider = ({ children }) => {
  const { theme } = useData();
  return (
    <PaperProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
    </PaperProvider>
  );
};

export default ThemeProvider;
