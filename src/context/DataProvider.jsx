import React, { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const DataContext = createContext();

const initialState = {
  theme: "darks",
};

const DataProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState);
  return (
    <DataContext.Provider value={{ ...value, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

export default DataProvider;
