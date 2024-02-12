import React from 'react';
import {Box} from '@mui/material';
import {Button} from '@mui/material';
import {useNavigate} from "react-router-dom";
import error from '../../assets/error404.png';

const Page404: React.FC = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/calendar')
    }
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding : '20px', flexDirection: 'column'}}>
            <img src={error} alt="error404" style={{width: '60%'}}/>
            <Button variant="contained" onClick={handleClick}>Продолжить</Button>
        </Box>
    );
};

export default Page404;