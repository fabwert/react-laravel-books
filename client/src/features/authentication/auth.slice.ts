import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { AuthState, LoginRequest } from "./auth.interface";
import axios from "axios";
import axiosInstance from "../../axios";

const initialState: AuthState = {
  showLoginModal: false,
  user: null,
  token: localStorage.getItem("@fabwert_token"),
  status: "idle",
  error: null,
};

export const signin = createAsyncThunk(
  "auth/signin",
  async (data: LoginRequest) => {
    const response = await axios({
      method: "post",
      url: "/login",
      baseURL: import.meta.env.VITE_LARAVEL_BACKEND_URL,
      data,
    });
    return response.data;
  }
);

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  const response = await axiosInstance.get("/load-user");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowLoginModal: (state, action) => {
      state.showLoginModal = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      state.showLoginModal = false;
      localStorage.removeItem("@fabwert_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("@fabwert_token", action.payload.token);

        state.showLoginModal = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(loadUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = localStorage.getItem("@fabwert_token");
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getShowLoginModal = (state: RootState) =>
  state.auth.showLoginModal;
export const getAuthUser = (state: RootState) => state.auth.user;
export const getAuthStatus = (state: RootState) => state.auth.status;
export const getAuthError = (state: RootState) => state.auth.error;

export const { setShowLoginModal, logout } = authSlice.actions;

export default authSlice.reducer;
