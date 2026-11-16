
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const REGISTER_URL = "http://127.0.0.1:8000/api/auth/register/";
const LOGIN_URL = "http://127.0.0.1:8000/api/token/";


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
        }),
      });

      const data = await response.json();


      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }

      return data;

    } catch (error) {
      return thunkAPI.rejectWithValue({
        detail: "Registration failed. Please try again.",
      });
    }
  }
);

// LOGIN USER
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData,thunkAPI) => {
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
      }
      console.log(data)

      return data;

    } catch (error) {
      return thunkAPI.rejectWithValue({
        detail: "Login failed. Please try again.",
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    loading: false,
    error: null,
    success: false,
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: !!localStorage.getItem("access")
    },

  reducers: {
    
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
      state.error = null;
      
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || {
          detail: "Registration failed.",
        };
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.isAuthenticated = true;

        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload || {
          detail: "Login failed.",
        };
      });
  },
});

export const {  logout } = authSlice.actions;

export default authSlice.reducer;
