import { createSelector } from '@reduxjs/toolkit';

export const cartItemSelector = (state) => state.cart?.cartItem;
export const showMiniCartSelector = (state) => state.cart?.showMiniCart;

//count number of products in cart
export const cartItemCountSelector = createSelector(cartItemSelector, (carItems) =>
  carItems.reduce((count, item) => count + item.quantity, 0)
);

//count total price in cart
export const cartTotalSelector = createSelector(cartItemSelector, (carItems) =>
  carItems
    .filter((item) => item.isCheckout !== false)
    .reduce((total, item) => total + item.quantity * item.product.salePrice, 0)
);
