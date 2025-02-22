import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

// @ts-ignore
const initialUser: User = { uid: "", fullName: "Guest", email: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: (state, action) => {
      // localStorage.setItem("user", JdSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
