// Methode 1
/*
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import adminReducer from "./admins/adminSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    admins: adminReducer,
    auth: authReducer, // (login / logout)
  }
});

export default store;
*/

// Methode 2
/*
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import adminReducer from "./admins/adminSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    admins: adminReducer,
    auth: authReducer, // (login / logout)
  },
  // load data from localStorage to redux
  preloadedState: loadFromLocalStorage(),
});

function saveToLocalStorage(state) {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem("serialisedState", serialState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("serialisedState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const objectWithoutKey = (object, key) => {
  const { [key]: deletedKey, ...otherKeys } = object;
  return otherKeys;
};

// save data from redux to localStorage s'il existe un changement au niveau redux
store.subscribe(() => {
  // let object = store.getState();
  let object = objectWithoutKey(
    objectWithoutKey(store.getState(), "users"),
    "admins"
  );
  saveToLocalStorage(object);
});

export default store;
*/

// Methode 3
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import userReducer from "./users/userSlice";
import adminReducer from "./admins/adminSlice";
import authReducer from "./auth/authSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // if you do not want to persist this part of the state
  blacklist: ["admins", "users"],
};

const reducer = combineReducers({
  users: userReducer,
  admins: adminReducer,
  auth: authReducer,
});

// this ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    // c'est juste pour cacher une erreur concernant "serialize"
    serializableCheck: false,
  }),
});

export default store;
