import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { resetErrAction } from "../globalAction/globalAction";
const baseURL = import.meta.env.VITE_BASE_URL

const initialState = {
    error: null,
    loading: false,
    users: [],
    user:{},
    profile: {},
    userAuth:{
        loading: false,
        error: null,
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}

export const registerUserAction = createAsyncThunk(
    'auth/register',
    async({firstname,lastname,username,password},{rejectWithValue, getState, dispatch}) =>{
        try {
            const data = await axios.post(`${baseURL}/user/register`,{
                firstname,lastname,username,password
            })
            return data
        } catch (error) {
            console.log('Error from registerUserAction:',error);
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const loginUserAction = createAsyncThunk(
    'auth/login',
    async({username,password},{rejectWithValue, getState, dispatch}) =>{
        try {
            const data = await axios.post(`${baseURL}/user/login`,{
                username,password
            })
            localStorage.setItem("userInfo", JSON.stringify(data));

            return data
        } catch (error) {
            console.log('Error from loginUserAction:',error);
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const logoutUserAction = createAsyncThunk(
    "auth/logout",
    async(payload,{rejectWithValue, getState, dispatch}) =>{
        localStorage.removeItem("userInfo");
        return true
    }
)


const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) =>{
        //! Login Action
        builder.addCase(loginUserAction.pending, (state, action) =>{
            state.userAuth.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) =>{
            state.userAuth.userInfo = action.payload;
            state.userAuth.loading = false;
            state.userAuth.error = false
        })
        builder.addCase(loginUserAction.rejected, (state, action) =>{
            state.userAuth.loading = false;
            state.userAuth.error = action.payload
        })
        
        //! Register Action
        builder.addCase(registerUserAction.pending, (state, action) =>{
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) =>{
            state.user = action.payload;
            state.loading = false;
        })
        builder.addCase(registerUserAction.rejected, (state, action) =>{
            state.error = action.payload
            state.loading = false;
        })

        //! Reset Error Action
        builder.addCase(resetErrAction.pending, (state) =>{
            state.error = null;
        })

        builder.addCase(logoutUserAction.fulfilled, (state,action) =>{
            state.userAuth.userInfo = null
        })
    }
})

const userReducer = userSlice.reducer
export default userReducer
