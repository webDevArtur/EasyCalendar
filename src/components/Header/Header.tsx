import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import '@fontsource/roboto';
import {useNavigate} from "react-router-dom";
import { logout } from '../../store/reducers/auth/thunks.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/redux-store.ts';

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const Logout = async () => {
        dispatch(logout() as any);
        navigate('/calendar')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#2E3B55' }}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#FFFFFF' }}>
                        Calendar
                    </Typography>
                    {user && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title={user.username} placement="bottom">
                                <Avatar alt={user.username} src="/path_to_avatar.jpg" sx={{ marginRight: '10px' }} />
                            </Tooltip>
                            <Typography variant="body1" sx={{ color: '#FFFFFF' }}>{user.username}</Typography>
                        </Box>
                    )}
                    <Link to="/login" style={{ textDecoration: 'none', color: '#FFFFFF', marginLeft: '10px' }}>
                        <Button color="inherit" size="large" endIcon={<LogoutIcon />} sx={{ fontWeight: 'bold' }} onClick={() => Logout()}>
                            Logout
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
