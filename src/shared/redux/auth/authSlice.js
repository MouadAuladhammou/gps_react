import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isObjectEmpty } from "../../helpers/functions";
import axios from "axios";

// login
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (payload, { getState }) => {
    // const currentAdmin = getState()?.auth?.currentAdmin
    const response = await axios.post(
      "http://64.226.124.200/api/admin/login",
      payload
    );
    // set Tokens in LocalStorage
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem(
      "tokens",
      JSON.stringify({ accessToken, refreshToken })
    );
    return response.data;
  }
);

const initialState = {
  currentAdmin: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: async (state, { payload }) => {
      await axios.post("http://64.226.124.200/api/admin/logout", payload);
      state.currentAdmin = {};
      localStorage.clear();
      window.location = "/login";
    },

    // c'set juste pour un test
    changeNameAdmin: (state) => {
      state.currentAdmin.first_name = "TEST CHANGE NAME";
    },
  },

  extraReducers: {
    // login admin
    [loginAsync.pending]: () => {
      console.log("Pending");
    },
    [loginAsync.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, currentAdmin: payload };
    },
    [loginAsync.rejected]: () => {
      console.log("Rejected!");
    },
  },
});

export const { logOut, changeNameAdmin } = authSlice.actions;

export const getCurrentAdmin = (state) => state.auth.currentAdmin;
export const isLoggedIn = (state) => !isObjectEmpty(state.auth.currentAdmin);

export default authSlice.reducer;
