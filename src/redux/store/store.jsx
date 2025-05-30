import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../slices/usersSlice/userSlice'

const store = configureStore({
    reducer:{
        users: userReducer
    }
});

export default store
