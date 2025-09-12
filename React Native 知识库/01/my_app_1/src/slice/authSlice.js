import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

// 登录
export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
});

// 注册
export const registerUser = createAsyncThunk("auth/register", async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      global.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        global.authToken = action.payload.token;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        global.authToken = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;