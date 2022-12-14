import React from 'react'
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export const User = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { user, logOut } = useUserAuth();
    const navigate = useNavigate();

    const signUserOut = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="wrapUser">
            <button onClick={(e) => setAnchorEl(e.currentTarget)} className="content">
                <img className="avatar" src={`https://avatars.dicebear.com/api/human/${user?.displayName}.svg`} alt="Avatar" />
                <div className="userInfo">
                    <span id="userName">{user?.displayName}</span>
                    <span id="email">{user?.email}</span>
                </div>
            </button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    style: {
                        width: 250,
                        marginLeft: -7,
                        marginTop: 20
                    },
                }}
            >
                <MenuItem onClick={signUserOut}>Logout</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>Your Upvotes(in dev)</MenuItem>
            </Menu>
        </div>
    )
}
