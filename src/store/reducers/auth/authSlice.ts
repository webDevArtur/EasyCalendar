import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../models/IUser';

interface AuthState {
    isAuthenticated: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    error: '',
    isLoading: false,
    user: {
        username: '',
        password: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

export const { isAuth, setLoading, setError, setUser} = authSlice.actions;
export default authSlice.reducer;
