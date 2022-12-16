import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = { value: localStorage.getItem('name') }

const userDataSlice = createSlice({
    name: "userData",
    initialState: INITIAL_STATE,
    reducers: {
        userLogin: (state, action) => {
            console.log(action, "action from redux/username")
            state.value = action.payload.userData
            console.log("state from redux/username", state.value)
        }
    }
})

export const { userLogin } = userDataSlice.actions;
export default userDataSlice.reducer;