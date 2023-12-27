import React from "react";
import { useMutation } from "react-query";

export const BasketContext = React.createContext();

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = React.useState([]);

  return (
    <BasketContext.Provider value={{ setBasketItems, basketItems }}>
      {children}
    </BasketContext.Provider>
  );
};
