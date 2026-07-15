import { createContext, useContext, useEffect, useReducer } from "react";

export const CartContext = createContext(null);

const initialCartItems = [];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { productId, qty = 1 } = action;
      const existing = state.find((item) => item.productId === productId);
      if (existing) {
        return state.map((item) =>
          item.productId === productId
            ? { ...item, qty: item.qty + qty }
            : item,
        );
      }
      return [...state, { productId, qty }];
    }
    case "UPDATE_QTY": {
      const { productId, delta } = action;
      return state.map((item) =>
        item.productId === productId
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item,
      );
    }
    case "REMOVE_ITEM":
      return state.filter((item) => item.productId !== action.productId);
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartItems, () => {
    const savedData = localStorage.getItem("cart");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
