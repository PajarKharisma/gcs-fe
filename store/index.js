// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";
import data from "./data";

export const store = configureStore({
  reducer: {
    data,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
