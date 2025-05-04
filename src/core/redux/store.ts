import { configureStore } from "@reduxjs/toolkit";
import domainsReducer from "./reducers/domains-reducer"; // مسیر فایل domainsReducer

const store = configureStore({
  reducer: {
    domains: domainsReducer, // استفاده از reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
