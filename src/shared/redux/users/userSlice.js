import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Api
import userApi from "../../api/userApi";

export const fetchAsyncUsers = createAsyncThunk(
  "users/fetchAsyncUsers",
  async ({ page, searchName }) => {
    const response = await userApi.get(
      `/all?page=${page}&limit=3&search=${searchName}`
    );
    return response.data;
  }
);

export const fetchAsyncUserDetail = createAsyncThunk(
  "users/fetchAsyncUserDetail",
  async (id) => {
    const response = await userApi.get(`/${id}/companies`);
    return response.data;
  }
);

export const addAsyncUser = createAsyncThunk(
  "users/addAsyncUser",
  async (payload) => {
    // const response = await userApi.post(
    //   "http://localhost:3000/api/users/register",
    //   payload
    // );
    const response = await userApi.post(`/register`, payload);
    return response.data.user;
  }
);

export const updateAsyncUser = createAsyncThunk(
  "users/updateAsyncUser",
  async (payload) => {
    // const response = await userApi.put(
    //   "http://localhost:3000/api/users/register",
    //   payload
    // );
    // return response.data.vehucle;
    return payload;
  }
);

export const deleteAsyncUser = createAsyncThunk(
  "users/deleteAsyncUser",
  async (id) => {
    console.log("to delete ...", id);
    const response = await userApi.delete(`/delete/${id}`);
    console.log("response", response);
    return { id };
  }
);

export const addAsyncVehucle = createAsyncThunk(
  "users/addAsyncVehucle",
  async (payload) => {
    // const response = await userApi.post(
    //   "http://localhost:3000/api/users/register",
    //   payload
    // );
    // return response.data.vehucle;
    return payload;
  }
);

export const updateAsyncVehucle = createAsyncThunk(
  "users/updateAsyncVehucle",
  async (payload) => {
    // const response = await userApi.put(
    //   "http://localhost:3000/api/users/register",
    //   payload
    // );
    // return response.data.vehucle;
    return payload;
  }
);

export const deleteAsyncVehucle = createAsyncThunk(
  "users/deleteAsyncVehucle",
  async (payload) => {
    // const response = await userApi.delete(
    //   "http://localhost:3000/api/users/register",
    //   payload
    // );
    // return response.data.vehucle;
    return { id: payload.id };
  }
);

const initialState = {
  users: [],
  selectUser: {},
  totalPages: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // on l'utilse pas
    addMUser: (state, { payload }) => {
      // alors ici, on utilise la fonction "fetchAsyncMovies()" à la place
      // state.movies = payload;
    },

    removeSelectedUser: (state) => {
      state.selectUser = {};
    },
  },

  extraReducers: {
    // get all users
    [fetchAsyncUsers.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncUsers.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, users: payload.users, totalPages: payload.totalPages };
    },
    [fetchAsyncUsers.rejected]: () => {
      console.log("Rejected!");
    },

    // get user detail
    [fetchAsyncUserDetail.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncUserDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, selectUser: payload };
    },
    [fetchAsyncUserDetail.rejected]: () => {
      console.log("Rejected!");
    },

    // add user
    [addAsyncUser.pending]: () => {
      console.log("Pending");
    },
    [addAsyncUser.fulfilled]: (state, { payload }) => {
      console.log("Posted Successfully!");
      state.users.push(payload);
    },
    [addAsyncUser.rejected]: () => {
      console.log("Rejected!");
    },

    // update user
    [updateAsyncUser.pending]: () => {
      console.log("Pending");
    },
    [updateAsyncUser.fulfilled]: (state, { payload }) => {
      console.log("Updated Successfully!");
      return {
        ...state,
        selectUser: payload,
      };
    },
    [updateAsyncUser.rejected]: () => {
      console.log("Rejected!");
    },

    // delete User
    [deleteAsyncUser.pending]: () => {
      console.log("Pending");
    },
    [deleteAsyncUser.fulfilled]: (state, { payload }) => {
      const users = state.users.filter((u) => u.id !== payload.id);
      return {
        ...state,
        users: users,
      };
    },
    [deleteAsyncUser.rejected]: () => {
      console.log("Rejected!");
    },

    // add vehucle
    [addAsyncVehucle.pending]: () => {
      console.log("Pending");
    },
    [addAsyncVehucle.fulfilled]: (state, { payload }) => {
      console.log("Posted Successfully");
      state.selectUser.companies.push(payload);
    },
    [addAsyncVehucle.rejected]: () => {
      console.log("Rejected!");
    },

    // update vehucle
    [updateAsyncVehucle.pending]: () => {
      console.log("Pending");
    },
    [updateAsyncVehucle.fulfilled]: (state, { payload }) => {
      console.log("Updated Successfully");
      console.log("payload", payload);
      const index = state.selectUser.companies.findIndex(
        (c) => c.id === payload.id
      );
      state.selectUser.companies[index] = payload;
    },
    [updateAsyncVehucle.rejected]: () => {
      console.log("Rejected!");
    },

    // delete vehucle
    [deleteAsyncVehucle.pending]: () => {
      console.log("Pending");
    },
    [deleteAsyncVehucle.fulfilled]: (state, { payload }) => {
      const vehucles = state.selectUser.companies.filter(
        (v) => v.id !== payload.id
      );

      return {
        ...state,
        selectUser: { ...state.selectUser, companies: vehucles },
      };
    },
    [deleteAsyncVehucle.rejected]: () => {
      console.log("Rejected!");
    },
  },
});

export const { removeSelectedUser } = userSlice.actions;

export const getAllUsers = (state) => state.users.users;
export const getTotalPages = (state) => state.users.totalPages;
export const getSelectedUser = (state) => state.users.selectUser;
export const getSelectedUserCompanies = (state) =>
  state.users.selectUser.companies;

export default userSlice.reducer;
