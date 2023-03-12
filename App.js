import { StyleSheet, Text, View } from "react-native";
import Header from "./src/component/Header";
import { Provider as PaperProvider } from 'react-native-paper';
export default function App() {
  return (
    <PaperProvider>
      <Header />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
