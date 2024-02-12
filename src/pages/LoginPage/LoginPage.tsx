import { FC, useState, useEffect } from 'react';
import { Button ,Container, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/reducers/auth/authSlice';
import { login } from '../../store/reducers/auth/thunks';
import { RootState } from '../../store/redux-store.ts';
import '@fontsource/roboto';

const LoginPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const error = useSelector((state: RootState) => state.auth.error);
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const validateForm = () => {
        let isValid = true;

        if (!loginValue.trim()) {
            setLoginError('Введите логин');
            isValid = false;
        } else if (!loginValue.includes('@')) {
            setLoginError('Логин должен содержать символ "@"');
            isValid = false;
        } else {
            setLoginError('');
        }

        if (!passwordValue.trim()) {
            setPasswordError('Введите пароль');
            isValid = false;
        } else if (passwordValue.length < 6) {
            setPasswordError('Пароль должен содержать минимум 6 символов');
            isValid = false;
        } else {
            const latinAndSpecialChars = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/;
            if (!latinAndSpecialChars.test(passwordValue)) {
                setPasswordError('Пароль должен содержать хотя бы одну латинскую букву и один специальный символ');
                isValid = false;
            } else {
                setPasswordError('');
            }
        }

        return isValid;
    };

    const handleLogin = async () => {
        if (validateForm()) {
            const credentials = {
                username: loginValue,
                password: passwordValue
            };
            dispatch(setLoading(true));
            await dispatch(login(credentials) as any);
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/calendar');
        }
    }, [isAuthenticated]);

    return (
        <Box
            sx={{
                backgroundColor: '#d7d7d7',
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container
                component="main"
                maxWidth="xs"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Box
                    sx={{
                        boxShadow: 3,
                        padding: 4,
                        backgroundColor: 'white',
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            marginBottom: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        Авторизация
                    </Typography>
                    <TextField
                        label="Логин"
                        value={loginValue}
                        onChange={(e) => setLoginValue(e.target.value)}
                        fullWidth
                        error={!!loginError}
                        helperText={loginError}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                        fullWidth
                        error={!!passwordError}
                        helperText={passwordError}
                        sx={{ marginBottom: 2 }}
                    />
                    {error && <Typography variant="body2" color="error" style={{ marginBottom: 10, textAlign: 'center' }}>{error}</Typography>}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ fontWeight: 'bold' }}
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Загрузка...' : 'Войти'}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default LoginPage;
