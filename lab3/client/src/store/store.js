import {configureStore} from '@reduxjs/toolkit'
import userSlice from './../slices/userSlice';
import roleSlice from './../slices/roleSlice'
import authSlice from './../slices/authSlice'

export const store = configureStore({
    reducer:{
        user:userSlice,
        role:roleSlice,
        auth:authSlice
    },
});

