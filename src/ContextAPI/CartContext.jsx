import React, { createContext, useEffect, useState } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/product/product.json")
      .then((response) => response.json())
      .then((result) => setProducts(result.products))
      .catch((e) => console.log(e));
  }, []);

  return (
    <CartContext.Provider value={{ products, setCart, cart }} style={{backgroundColor:'#081b29', color:'#ededed'}} >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
