import DataProvider from "./src/context/DataProvider";
import ThemeProvider from "./src/context/ThemeProvider";
import Navigation from "./src/screens/Navigation";
export default function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </DataProvider>
  );
}
