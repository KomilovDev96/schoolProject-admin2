import { createSlice } from "@reduxjs/toolkit";

import { LOGIN, ROLE, USER_DATA, SET_AUTH } from '@/utils/variables';
// const userDATA = getLocalStorage(USER_DATA);
// const userAUTH = getLocalStorage(ROLE);
// const userTOKEN = getLocalStorage(USER_TOKEN);
const roleParse = localStorage.getItem(USER_DATA)
const userDataRole = JSON.parse(roleParse)
const role = JSON.parse(roleParse)
const ParseUsers = localStorage.getItem('users')
const parseUsers = JSON.parse(ParseUsers)

const initialState = {
    isAuth: false,
    userData: userDataRole ? userDataRole : null,
    token: null,
    users: parseUsers ? parseUsers : null,
    role: role?.role ? role?.role : "user"
};
const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsAuth: (state, { payload }) => {
            state.isAuth = payload;
        },
        setToken: (state, { payload }) => {
            state.token = payload;
        },
        setRole: (state, { payload }) => {
            state.role = payload;
        },
        setUserData: (state, { payload }) => {
            state.userData = payload;
        },
        setUsers: (state, { payload }) => {
            state.users = payload;
        },
    },
});
export const { setIsAuth, setToken, setRole, setUserData, setUsers } = AuthSlice.actions
export default AuthSlice.reducer;
