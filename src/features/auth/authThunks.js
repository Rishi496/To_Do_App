// src/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Mock authentication
      if (username === "demo" && password === "password") {
        const user = { id: 1, username };
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
