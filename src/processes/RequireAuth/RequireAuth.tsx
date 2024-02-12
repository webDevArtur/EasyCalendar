import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/redux-store.ts';
import { setUser, isAuth } from '../../store/reducers/auth/authSlice';
import {IUser} from "../../models/IUser.ts";

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useDispatch();

    const storedUser = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedUser && isAuthenticated === 'true') {
        const user = JSON.parse(storedUser);

        dispatch(setUser(user));
        dispatch(isAuth(true));
    } else {
        dispatch(setUser({} as IUser));
        dispatch(isAuth(false));
    }

    const isAuthenticatedRedux = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticatedRedux) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default RequireAuth;
