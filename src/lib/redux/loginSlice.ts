import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginBody, User} from "@/types/user";
import axios from "axios";
import {login} from "@/lib/login";
import {loginUser} from "@/fetch/auth";
import {registerThunk} from "@/lib/redux/authSlice";


type Login = {
    user: User | null
    loading: boolean
    error: string | null
}


const initialState: Login = {
    user: null,
    loading: false,
    error: null
}


export const loginThunk = createAsyncThunk<User, LoginBody>('loginAuth/loginThunk', async (body) => {
    const data = await loginUser(body)
    return  data
})
 const loginSlice = createSlice({
    name: 'loginAuth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loginThunk.pending, (state) => {
            state.loading = true
                state.error = null
        })
        builder.addCase(loginThunk.fulfilled,(state,action) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(registerThunk.rejected, (state, action) => {
            state.loading = true
            state.error = action.error.message || 'Error reg'
        })
    }
})
export  default  loginSlice.reducer