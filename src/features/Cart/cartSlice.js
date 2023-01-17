import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItem: [], // [{id: 1, product: {},quantity: 1}]
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMiniCart(state) {
      state.showMiniCart = false;
    },
    addToCart(state, action) {
      //newItem: {id, product, quantity, isCheckout}
      const newItem = action.payload;
      //check if product is in cart
      const index = state.cartItem.findIndex((item) => item.id === newItem.id);

      if (index >= 0) {
        state.cartItem[index].quantity += newItem.quantity;
      } else {
        state.cartItem.push(newItem);
      }
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      //check if product is in cart
      const index = state.cartItem.findIndex((item) => item.id === id);
      if (index >= 0) {
        state.cartItem[index].quantity = quantity;
      }
    },
    removeFromCart(state, action) {
      const idNeedToRemove = action.payload;
      //khong can clone vi trong thang slice nay co embed immer nen co ho tro mutable voi arr obj
      state.cartItem = state.cartItem.filter((item) => item.id !== idNeedToRemove);
    },
    checkout(state, action) {
      //payload will be product id
      const idNeedToCheckout = action.payload;

      const index = state.cartItem.findIndex((item) => item.id === idNeedToCheckout);

      if (index >= 0) {
        state.cartItem[index].isCheckout = !state.cartItem[index].isCheckout;
      }
    },
  },
});

const { actions, reducer } = cartSlice;

export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart, checkout } = actions; //named export => import by {}
export default reducer; //default export => import by any name u want
