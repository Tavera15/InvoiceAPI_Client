import { createSlice } from '@reduxjs/toolkit'

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: {
        isLoggedIn: false,
        userEmail: ""
    },
    reducers: {
        userAuthentication: (state, action) =>
        {
            return{
                ...state, ...{
                    userEmail: action.payload.email,
                    isLoggedIn: action.payload.email !== ""
                }
            }
        }
    }
})

export const {userAuthentication} = AuthSlice.actions;
export default AuthSlice.reducer;