import { createContext, useContext, useEffect, useReducer } from "react";

export const WishlistContext = createContext(null);

const initialWishlistItems = [];

function wishlistReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const { productId } = action;
      const exists = state.includes(productId);
      return exists
        ? state.filter((id) => id !== productId)
        : [...state, productId];
    }
    case "REMOVE_ITEM":
      return state.filter((id) => id !== action.productId);
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export default function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    initialWishlistItems,
    () => {
      const savedData = localStorage.getItem("wishlist");
      return savedData ? JSON.parse(savedData) : [];
    },
  );

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state));
  }, [state]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
