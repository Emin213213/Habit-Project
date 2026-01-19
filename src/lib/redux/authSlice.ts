import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {registerUser} from "@/fetch/auth";
import {RegBody, User} from "@/types/user";

type UserState = {
    user: User | null
    load: boolean
    err: string | null
}

const initialState:UserState = {
    user: null,
    load: false,
    err: null
}

 export const registerThunk = createAsyncThunk<User, RegBody>("auth/registerThunk", async  (body) => {
    const data = await registerUser(body)
    return data
})

 const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(registerThunk.pending, (state) => {
            state.load = true
            state.err = null
        })
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.load = false
            state.user = action.payload
        })
        builder.addCase(registerThunk.rejected, (state, action) => {
            state.load = true
            state.err = action.error.message || 'Error reg'
        })
    }
})

export default authSlice.reducer