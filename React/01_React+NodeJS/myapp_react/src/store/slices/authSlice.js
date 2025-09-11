import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// createAsyncThunk 是什么？
// 它是 Redux Toolkit 提供的一个工具，用来处理异步请求（比如调用 API）
// pending （请求发出时）
// fulfilled（请求成功时）
// rejected （请求失败时）

// 登录
export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const res = await api.post("/auth/login", formData);
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
    user: null,
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      });
  },
});

// 这里 builder.addCase 就是告诉 Redux：
// 当 loginUser.pending → state.status = "loading"
// 当 loginUser.fulfilled → state.user 和 state.token 更新
// 当 loginUser.rejected → state.error 记录错误

export const { logout } = authSlice.actions;
export default authSlice.reducer;