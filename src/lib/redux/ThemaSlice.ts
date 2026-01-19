import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    theme: string
}

const initialState: UserState = {
    theme: 'light'
};

      const userSlice = createSlice({
    name: "user",
    initialState,
   reducers : {
       setTheme(state, action: PayloadAction<boolean>) {
           state.theme = action.payload ? "dark" : "light";
       },
       toggleTheme(state) {
           state.theme = state.theme === "light" ? "dark" : "light";
       },

   }
});

export const {setTheme,toggleTheme } = userSlice.actions;
export default userSlice.reducer;
