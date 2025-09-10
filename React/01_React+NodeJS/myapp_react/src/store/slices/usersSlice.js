import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// CRUD
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get("/users");
  return res.data;
});

export const addUser = createAsyncThunk("users/addUser", async (data) => {
  const res = await axios.post("/users", data);
  return res.data;
});

export const updateUser = createAsyncThunk("users/updateUser", async ({ id, data }) => {
  await axios.put(`/users/${id}`, data);
  return { id, ...data };
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`/users/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: "users",
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.list.findIndex((u) => u.UserID === action.payload.id);
        if (idx > -1) state.list[idx] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.UserID !== action.payload);
      });
  },
});

export default usersSlice.reducer;
