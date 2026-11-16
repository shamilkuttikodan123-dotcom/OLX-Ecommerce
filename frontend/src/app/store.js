
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from '../features/products/productsSlice'
import cartReducer from '../features/cart/cartSlice'
import checkoutReducer from '../features/checkout/checkoutSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart :cartReducer,
    checkout:checkoutReducer

  },
});

export default store;