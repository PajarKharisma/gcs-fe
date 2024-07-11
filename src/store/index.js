// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";
import gcs from "./gcs";

export const store = configureStore({
  reducer: {
    gcs: gcs,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
