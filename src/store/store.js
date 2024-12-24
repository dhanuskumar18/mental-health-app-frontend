import { configureStore } from "@reduxjs/toolkit";
import state1reducer from "../slices/state1.js"
import storage from 'redux-persist/lib/storage'; // Default: localStorage
import { persistReducer, persistStore } from 'redux-persist';
console.log(state1reducer);
const persistConfig = {
    key: 'root',
    storage, // Use localStorage for persistence
  };
  const persistedReducer = persistReducer(persistConfig, state1reducer);
  export const store= configureStore({
      reducer:{
          s1reducer:persistedReducer   //s1reducer-it contains the state value
        }
    })
    export const persistor = persistStore(store);