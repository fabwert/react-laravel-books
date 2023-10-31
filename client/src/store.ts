import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import bookSlice from "./features/book/book.slice";
import authSlice from "./features/authentication/auth.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    book: bookSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
