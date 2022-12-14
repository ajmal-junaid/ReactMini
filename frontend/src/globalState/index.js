import {configureStore,createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:'user details',
    initialState:{counter:3},
    reducers:{
        addData(state,action){
            state=state+1;
        }
    }
})
export const actions = userSlice.actions;
const store = configureStore({
    reducer:userSlice.reducer
})
export default store;