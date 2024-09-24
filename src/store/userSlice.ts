import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../interfaces/store/userSlice';

const initialState: UserState = {
    uid: null,
    email: null,
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<{ uid: string; email: string }>) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
        },
        logoutUser: (state) => {
            state.uid = null;
            state.email = null;
            state.isAuthenticated = false;
            localStorage.removeItem('isAuthenticated');
        },
    },
});

// Export the actions to be used in components
export const { loginUser, logoutUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
