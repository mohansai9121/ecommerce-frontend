import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import API from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  console.log(useAuth());
  const auth = useAuth();
  const user = auth?.user;
  // LOAD CART FROM LOCALSTORAGE
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (user) {
      API.post("/cart", {
        userId: user._id,
        items: cart,
      });
    }
  }, [cart]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const res = await API.get(`/cart/${user._id}`);
        setCart(res.data.items);
      }
    };

    fetchCart();
  }, [user]);

  // SAVE CART TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // UPDATE QUANTITY
  const updateQty = (id, qty) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: Number(qty) } : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
