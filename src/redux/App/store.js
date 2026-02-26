// // import { configureStore } from '@reduxjs/toolkit';

// import { configureStore } from "@reduxjs/toolkit";


// const store = configureStore({
//   reducer: {
//     [userApi.reducerPath]: userApi.reducer, // Add userApi reducer
//     [authApi.reducerPath]: authApi.reducer, // Add authApi reducer
//     [PolicyApi.reducerPath]: PolicyApi.reducer, // Add authApi reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(userApi.middleware, authApi.middleware, PolicyApi.middleware), 
// });

// export default store;
      

import { configureStore } from "@reduxjs/toolkit";
import baseApi from "../api/baseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
