import { createSlice } from "@reduxjs/toolkit"

let INITIAL_STATE = { value: [] }

const userDataSlice = createSlice({
    name: "userData",
    initialState: INITIAL_STATE,
    reducers: {
        userLogin: (state, action) => {
            state.value = action.payload.userData
        }
    }
})

export const { userLogin } = userDataSlice.actions;
export default userDataSlice.reducer;