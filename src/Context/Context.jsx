import axios from "../axios";
import { useState, useEffect, createContext } from "react";

const AppContext = createContext({
  data: [],
  isError: "",
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  refreshData: () => {},
  clearCart: () => {},
});

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [cart, setCart] = useState(
      JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
          index === existingProductIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
      );

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const { imageData, ...productWithoutImage } = product;

      const updatedCart = [
        ...cart,
        { ...productWithoutImage, quantity: 1 },
      ];

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const refreshData = async () => {
    try {
      const response = await axios.get("/products");

      setData(response.data);
      setIsError("");
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsError(error.message);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
      <AppContext.Provider
          value={{
            data,
            isError,
            cart,
            addToCart,
            removeFromCart,
            refreshData,
            clearCart,
          }}
      >
        {children}
      </AppContext.Provider>
  );
};

export default AppContext;