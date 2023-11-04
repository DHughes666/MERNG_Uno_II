import {useState} from 'react'
import { Box, IconButton, Menu, MenuItem,
Typography } from "@mui/material";
import { FaUserNurse } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';

const UserMenu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate("/")
    }
    const handleProfileClick = () => {
        navigate("/profile")
    }
    return (
        <Box>
            <IconButton 
                onClick={(e) => setAnchorEl(e.currentTarget)}  
                color="inherit"
            >
                <FaUserNurse />
            </IconButton>
            <Menu 
                anchorEl={anchorEl} 
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={handleProfileClick}>
                    <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Typography>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default UserMenu;