import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Api
import adminApi from "../../api/adminApi";

export const fetchAsyncAdmins = createAsyncThunk(
  "admins/fetchAsyncAdmins",
  async ({ page, searchName }) => {
    const response = await adminApi.get(
      `/all?page=${page}&limit=3&search=${searchName}`
    );
    return response.data;
  }
);

export const fetchAsyncAdminDetail = createAsyncThunk(
  "admins/fetchAsyncAdminDetail",
  async (id) => {
    const response = await adminApi.get(`/${id}/companies`);
    return response.data;
  }
);

export const addAsyncAdmin = createAsyncThunk(
  "admins/addAsyncAdmin",
  async (payload) => {
    // const response = await axios.post(
    //   "http://localhost:3000/api/users/register",
    //   payload
    // );
    const response = await adminApi.post(`/register`, payload);
    return response.data.user;
  }
);

export const updateAsyncAdmin = createAsyncThunk(
  "admins/updateAsyncAdmin",
  async (payload) => {
    // const response = await adminApi.put(
    //   "http://localhost:3000/api/users/register",
    //   payload
    // );
    // return response.data.vehucle;
    return payload;
  }
);

export const deleteAsyncAdmin = createAsyncThunk(
  "admins/deleteAsyncAdmin",
  async (payload) => {
    // const response = await adminApi.delete(
    //   "http://localhost:3000/api/users/register",
    //   payload
    // );
    // return response.data.vehucle;
    return { id: payload.id };
  }
);

const initialState = {
  // currentAdmin: {},
  admins: [],
  selectAdmin: {},
  totalPages: 0,
};

const adminSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    removeSelectedAdmin: (state) => {
      state.selectAdmin = {};
    },
  },

  extraReducers: {
    // get all admins
    [fetchAsyncAdmins.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncAdmins.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return {
        ...state,
        admins: payload.admins,
        totalPages: payload.totalPages,
      };
    },
    [fetchAsyncAdmins.rejected]: () => {
      console.log("Rejected!");
    },

    // get admin detail
    [fetchAsyncAdminDetail.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncAdminDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, selectAdmin: payload };
    },
    [fetchAsyncAdminDetail.rejected]: () => {
      console.log("Rejected!");
    },

    // add admin
    [addAsyncAdmin.pending]: () => {
      console.log("Pending");
    },
    [addAsyncAdmin.fulfilled]: (state, { payload }) => {
      console.log("Posted Successfully!");
      state.admins.push(payload);
    },
    [addAsyncAdmin.rejected]: () => {
      console.log("Rejected!");
    },

    // update admin
    [updateAsyncAdmin.pending]: () => {
      console.log("Pending");
    },
    [updateAsyncAdmin.fulfilled]: (state, { payload }) => {
      console.log("Updated Successfully!");
      return {
        ...state,
        selectAdmin: payload,
      };
    },
    [updateAsyncAdmin.rejected]: () => {
      console.log("Rejected!");
    },

    // delete admin
    [deleteAsyncAdmin.pending]: () => {
      console.log("Pending");
    },
    [deleteAsyncAdmin.fulfilled]: (state, { payload }) => {
      const users = state.admins.filter((u) => u.id !== payload.id);
      return {
        ...state,
        admins: users,
      };
    },
    [deleteAsyncAdmin.rejected]: () => {
      console.log("Rejected!");
    },
  },
});

export const { removeSelectedAdmin } = adminSlice.actions;

export const getAllAdmins = (state) => state.admins.admins;
export const getTotalPages = (state) => state.admins.totalPages;
export const getSelectedAdmin = (state) => state.admins.selectAdmin;

export default adminSlice.reducer;
