import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {},
  foodList: []
};

const storeSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setFoodList(state, action) {
      state.foodList = action.payload;
    },
    addToCart(state, action) {
      const { itemId } = action.payload;
      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId] += 1;
      }
    },
    removeFromCart(state, action) {
      const { itemId } = action.payload;
      if (state.cartItems[itemId]) {
        state.cartItems[itemId] -= 1;
        if (state.cartItems[itemId] === 0) {
          delete state.cartItems[itemId];
        }
      }
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    }
  },
});

// Selector to calculate the total cart amount
export const getTotalCartAmount = (state) => {
  let totalAmount = 0;

  // Loop through the keys (item IDs) in cartItems
  for (const itemId in state.cartItems) {
    if (state.cartItems[itemId] > 0) {
      const itemInfo = state.foodList.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * state.cartItems[itemId];
      }
    }
  }

  return totalAmount;
};

export const { setFoodList, addToCart, removeFromCart, setCartItems } = storeSlice.actions;

export default storeSlice.reducer;
