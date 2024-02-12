import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, isAuth, setError } from './authSlice';
import axios from 'axios';
import { IUser } from '../../../models/IUser';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }, { dispatch }) => {
        try {
            const response = await axios.get<IUser[]>('../../users.json');
            const user = response.data.find(
                (u: IUser) => u.username === credentials.username && u.password === credentials.password
            );
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('isAuthenticated', 'true');
                dispatch(setUser(user));
                dispatch(isAuth(true));
                dispatch(setError(''));
            } else {
                dispatch(setError('Произошла ошибка аутентификации'));
            }
        } catch (error) {
            dispatch(setError('Произошла ошибка аутентификации'));
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        dispatch(setUser({} as IUser));
        dispatch(isAuth(false));
    }
);
