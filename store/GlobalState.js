import { createContext, useReducer } from "react";
import reducers from "./Reducers";
import { client } from "../util/shopify";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    total: 0,
    // isCartOpen: false,
    // checkout: { lineItems: [] },
    // shop: {},
    // clientproducts: [],
  };

  const [state, dispatch] = useReducer(reducers, initialState);

  console.log(initialState);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};
