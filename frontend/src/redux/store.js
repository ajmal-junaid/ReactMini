import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from './username';

//export const store = configureStore({
    export default configureStore({
    reducer:{
        userdata:userSliceReducer
    },
})