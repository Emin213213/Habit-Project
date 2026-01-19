import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./ThemaSlice";
import authSlice from "@/lib/redux/authSlice";
import loginSlice from "@/lib/redux/loginSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            theme: userReducer,
            auth: authSlice,
            login:loginSlice
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
