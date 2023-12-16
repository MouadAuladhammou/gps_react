import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "../../helpers/constants";

// Api
import userApi from "../../api/userApi";
import groupApi from "../../api/groupApi";
import vehicleApi from "../../api/vehicleApi";

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
    // const response = await userApi.get(`/${id}/companies`);
    const response = await userApi.get(`/show/${id}`);
    return response.data;
  }
);

export const addAsyncUser = createAsyncThunk(
  "users/addAsyncUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userApi.post(`/`, payload);
      return response.data;
    } catch (error) {
      if (error.response.status === 409) {
        // NB: "409" is the correct status code for duplicate resource or resource already exists.
        // Rejetez l'action avec la valeur d'erreur afin qu'elle puisse être capturée dans Reducer en tant que "payload"
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const updateAsyncUser = createAsyncThunk(
  "users/updateAsyncUser",
  async (payload, { rejectWithValue }) => {
    try {
      await userApi.put(`/`, payload);
      return { user: payload };
    } catch (error) {
      if (error.response.status === 409) {
        // NB: "409" is the correct status code for duplicate resource or resource already exists.
        // Rejetez l'action avec la valeur d'erreur afin qu'elle puisse être capturée dans Reducer en tant que "payload"
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const deleteAsyncUser = createAsyncThunk(
  "users/deleteAsyncUser",
  async (id) => {
    const response = await userApi.delete(`/${id}`);
    if (response.status === 200) {
      return { id };
    }
  }
);

export const deleteAsyncGroup = createAsyncThunk(
  "users/deleteAsyncGroup",
  async (id) => {
    const response = await groupApi.delete(`/${id}`);
    if (response.status === 200) {
      return { id };
    }
  }
);

export const addAsyncGroup = createAsyncThunk(
  "users/addAsyncGroup",
  async (payload) => {
    const response = await groupApi.post(`/`, payload);
    return response.data;
  }
);

export const addAsyncVehicle = createAsyncThunk(
  "users/addAsyncVehicle",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await vehicleApi.post(`/`, payload);
      return response.data;
    } catch (error) {
      if (error.response.status === 409) {
        // NB: "409" is the correct status code for duplicate resource or resource already exists.
        // Rejetez l'action avec la valeur d'erreur afin qu'elle puisse être capturée dans Reducer en tant que "payload"
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const updateAsyncVehicle = createAsyncThunk(
  "users/updateAsyncVehicle",
  async (payload, { rejectWithValue }) => {
    try {
      const { id } = payload;
      const response = await vehicleApi.put(`/${id}`, payload);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response.status === 409) {
        // NB: "409" is the correct status code for duplicate resource or resource already exists.
        // Rejetez l'action avec la valeur d'erreur afin qu'elle puisse être capturée dans Reducer en tant que "payload"
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const deleteAsyncVehicle = createAsyncThunk(
  "users/deleteAsyncVehicle",
  async (id) => {
    const response = await vehicleApi.delete(`/${id}`);
    if (response.status === 200) {
      return { id };
    }
  }
);

const initialState = {
  users: [],
  selectUser: {},
  totalPages: 0,
  loading: null,
  error: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // on l'utilse pas
    addMUser: (state, { payload }) => {
      // alors ici, on utilise la fonction "fetchAsyncMovies()" à la place
    },

    removeSelectedUser: (state) => {
      state.selectUser = {};
    },

    clearError: (state) => {
      state.error = {};
    },
  },

  extraReducers: {
    // get all users
    [fetchAsyncUsers.pending]: (state) => {
      console.log("Pending");
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchAsyncUsers.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return {
        ...state,
        loading: HTTP_STATUS.FULFILLED,
        users: payload.users,
        totalPages: payload.totalPages,
      };
    },
    [fetchAsyncUsers.rejected]: (state, { error }) => {
      console.log("Rejected!");
      state.loading = HTTP_STATUS.REJECTED;
      console.error(error);
    },

    // get user detail
    [fetchAsyncUserDetail.pending]: (state) => {
      console.log("Pending");
      state.loading = HTTP_STATUS.PENDING;
    },
    [fetchAsyncUserDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, loading: HTTP_STATUS.FULFILLED, selectUser: payload };
    },
    [fetchAsyncUserDetail.rejected]: (state, { error }) => {
      console.log("Rejected!");
      state.loading = HTTP_STATUS.REJECTED;
      console.error(error);
    },

    // add user
    [addAsyncUser.pending]: (state) => {
      console.log("Pending");
      state.loading = HTTP_STATUS.PENDING;
    },
    [addAsyncUser.fulfilled]: (state, { payload }) => {
      console.log("Posted Successfully!");
      return {
        ...state,
        loading: HTTP_STATUS.FULFILLED,
        users: [...state.users, payload],
      };
    },
    [addAsyncUser.rejected]: (state, { payload }) => {
      console.log("Rejected!");
      const { exists, existingField } = payload;
      // Gérer erreur de l'existence, ici elle est liée à la duplication des données des champs "cin" et "emeil"
      if (exists) {
        console.error(`Le champ ${existingField} existe déjà.`);
        return {
          ...state,
          loading: HTTP_STATUS.REJECTED,
          error: { exists, existingField },
        };
      }
      return state;
    },

    // update user
    [updateAsyncUser.pending]: (state) => {
      console.log("Pending");
      state.loading = HTTP_STATUS.PENDING;
    },
    [updateAsyncUser.fulfilled]: (state, { payload }) => {
      console.log("Updated Successfully!");
      const { user } = payload;
      const { id } = user;
      const updatedUsers = state.users.map((u) => {
        // Vérifier si l'utilisateur actuel a le même ID que celui mis à jour
        if (u.id === id) {
          return {
            ...u,
            // Ajouter d'autres propriétés à mettre à jour
            ...user,
          };
        }
        // Ne pas mettre à jour cet utilisateur, retourner tel quel
        return u;
      });

      return {
        ...state,
        loading: HTTP_STATUS.FULFILLED,
        users: updatedUsers,
      };
    },
    [updateAsyncUser.rejected]: (state, { payload }) => {
      console.log("Rejected!");
      const { exists, existingField } = payload;
      // Gérer erreur de l'existence, ici elle est liée à la duplication des données des champs "cin" et "email"
      if (exists) {
        console.error(`Le champ ${existingField} existe déjà.`);
        return {
          ...state,
          loading: HTTP_STATUS.REJECTED,
          error: { exists, existingField },
        };
      }
      return state;
    },

    // delete User
    [deleteAsyncUser.pending]: (state) => {
      console.log("Pending");
      state.loading = HTTP_STATUS.PENDING;
    },
    [deleteAsyncUser.fulfilled]: (state, { payload }) => {
      const users = state.users.filter((u) => u.id !== payload.id);
      return {
        ...state,
        loading: HTTP_STATUS.FULFILLED,
        users: users,
      };
    },
    [deleteAsyncUser.rejected]: (state, { error }) => {
      console.log("Rejected!");
      state.loading = HTTP_STATUS.REJECTED;
      console.error(error);
    },

    // add vehicle
    [addAsyncVehicle.pending]: (state) => {
      console.log("Pending");
      state.loading = HTTP_STATUS.PENDING;
    },
    [addAsyncVehicle.fulfilled]: (state, { payload }) => {
      console.log("Posted Successfully");
      const { groupe_id } = payload;
      const updatedGroupes = state.selectUser.groupes.map((group) => {
        if (group.id === parseInt(groupe_id)) {
          return {
            ...group,
            vehicles: [...(group.vehicles ?? []), payload],
          };
        }
        return group;
      });
      // state.selectUser.groupes = updatedGroupes; // (non recommandé)
      // NB: il est généralement préférable de retourner un nouvel objet d'état dans les reducers Redux
      return {
        ...state,
        loading: HTTP_STATUS.FULFILLED,
        selectUser: {
          ...state.selectUser,
          groupes: updatedGroupes,
        },
      };
    },
    [addAsyncVehicle.rejected]: (state, { payload }) => {
      console.log("Rejected!");
      const { exists, existingField } = payload;
      // Gérer erreur de l'existence, ici elle est liée à la duplication des données des champs "IMEI" et "registration_number"
      if (exists) {
        console.error(`Le champ ${existingField} existe déjà.`);
        return {
          ...state,
          loading: HTTP_STATUS.REJECTED,
          error: { exists, existingField },
        };
      }
      return state;
    },

    // update Vehicle
    [updateAsyncVehicle.pending]: (state) => {
      console.log("Pending");
      state.loading = HTTP_STATUS.PENDING;
    },
    [updateAsyncVehicle.fulfilled]: (state, { payload }) => {
      console.log("Updated Successfully");
      return {
        ...state,
        loading: HTTP_STATUS.FULFILLED,
        selectUser: {
          ...state.selectUser,
          groupes: payload.groupes,
        },
      };
    },
    [updateAsyncVehicle.rejected]: (state, { payload }) => {
      console.log("Rejected!");
      const { exists, existingField } = payload;
      // Gérer erreur de l'existence, ici elle est liée à la duplication des données des champs "IMEI" et "registration_number"
      if (exists) {
        console.error(`Le champ ${existingField} existe déjà.`);
        return {
          ...state,
          loading: HTTP_STATUS.REJECTED,
          error: { exists, existingField },
        };
      }
    },

    // delete Vehicle
    [deleteAsyncVehicle.pending]: (state) => {
      console.log("Pending");
      state.loading = HTTP_STATUS.PENDING;
    },
    [deleteAsyncVehicle.fulfilled]: (state, { payload }) => {
      console.log("Deleted Successfully");
      const { id } = payload;
      const updatedGroupes = state.selectUser.groupes.map((group) => {
        const updatedVehicles = group.vehicles.filter(
          (vehicle) => vehicle.id !== id
        );
        return {
          ...group,
          vehicles: updatedVehicles,
        };
      });
      return {
        ...state,
        loading: HTTP_STATUS.FULFILLED,
        selectUser: {
          ...state.selectUser,
          groupes: updatedGroupes,
        },
      };
    },
    [deleteAsyncVehicle.rejected]: (state, { error }) => {
      console.log("Rejected!");
      state.loading = HTTP_STATUS.REJECTED;
      console.error(error);
    },

    // add group
    [addAsyncGroup.pending]: (state) => {
      console.log("Pending");
      state.loading = HTTP_STATUS.PENDING;
    },
    [addAsyncGroup.fulfilled]: (state, { payload }) => {
      console.log("Posted Successfully");
      return {
        ...state,
        loading: HTTP_STATUS.FULFILLED,
        selectUser: {
          ...state.selectUser,
          groupes: [...state.selectUser.groupes, payload],
        },
      };
    },
    [addAsyncGroup.rejected]: (state, { error }) => {
      console.log("Rejected!");
      state.loading = HTTP_STATUS.REJECTED;
      console.error(error);
    },

    // delete group
    [deleteAsyncGroup.pending]: (state) => {
      console.log("Pending");
      state.loading = HTTP_STATUS.PENDING;
    },
    [deleteAsyncGroup.fulfilled]: (state, { payload }) => {
      const groupes = state.selectUser.groupes.filter(
        (group) => group.id !== payload.id
      );

      return {
        ...state,
        loading: HTTP_STATUS.FULFILLED,
        selectUser: {
          ...state.selectUser,
          groupes: groupes,
        },
      };
    },
    [deleteAsyncGroup.rejected]: (state, { error }) => {
      console.log("Rejected!");
      state.loading = HTTP_STATUS.REJECTED;
      console.error(error);
    },
  },
});

export const { removeSelectedUser, clearError } = userSlice.actions;

export const getAllUsers = (state) => state.users.users;
export const getTotalPages = (state) => state.users.totalPages;
export const getSelectedUser = (state) => state.users.selectUser;
export const getLoadingStatus = (state) => state.users.loading;
export const getSelectedUserGroups = (state) =>
  state.users.selectUser.groupes.map(({ id, name }) => ({ id, name }));
export const getError = (state) => state.users.error;

export default userSlice.reducer;
