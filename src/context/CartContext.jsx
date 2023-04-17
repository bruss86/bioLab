import { getDownloadURL, ref } from "firebase/storage";
import { React, createContext, useState, useContext } from "react";
import { storage } from "../../DB/firebase-config";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
  };

  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      const newCart = cart.map((cartItem) => {
        if (cartItem.item.id === item.id) {
          return {
            item: cartItem.item,
            quantity: quantity,
          };
        } else {
          return cartItem;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, { item, quantity }]);
    }
  };

  const removeItem = (itemId) => {
    const newCart = cart.filter((cartItem) => cartItem.item.id !== itemId);
    setCart(newCart);
  };

  const isInCart = (itemId) => {
    return cart.some((cartItem) => cartItem.item.id === itemId);
  };

  const cartCount = () => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  const sumarTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.item.price;
    });
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        isInCart,
        clearCart,
        cart,
        cartCount,
        sumarTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
