import { useState } from 'react'
import { Box, AppBar, Toolbar, Tabs, Tab, Button, Typography, IconButton } from "@mui/material";
import { ImBlogger } from "react-icons/im"
import { headerStyles } from "./header-styles";
import { BiLogInCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import UserMenu from './user/userMenu'

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state:any) =>state.isLoggedIn)
    const [value, setValue] = useState(0)

    const handleAddBlog = () => {
        navigate("/addBlog")
    }

    return <AppBar sx={headerStyles.appBar}>
        <Toolbar>
            <ImBlogger 
            size={'30px'}
            style={{
                borderRadius: "50%", padding: "10px",
                backgroundColor: "#6c5252"
            }} />
            <Box onClick={handleAddBlog} sx={headerStyles.addLink}>
                <Typography fontSize={20} fontFamily={"Work Sans"}>
                    Post new blog
                    <IconButton color='inherit'>
                        <ImBlogger />
                    </IconButton>
                </Typography>
            </Box>
            <Box sx={headerStyles.tabContainer}>
                <Tabs textColor="inherit" 
                // indicatorColor="primary" 
                TabIndicatorProps={{style: {background: "white"}}}
                value={value}
                onChange={(e, val) => setValue(val)}
                >
                    {/* Method I of linking routes */}
                    {/** @ts-ignore */}
                    <Tab LinkComponent={Link} to="/" label="Home"/>
                    {/** @ts-ignore */}
                    <Tab LinkComponent={Link} to="/blogs" label="Blogs"/>
                </Tabs>
                {isLoggedIn ? (<UserMenu/>) : (
                    //Method II of linking routes 
                <Link style={{textDecoration: "none"}} to="/auth">
                    <Button endIcon={<BiLogInCircle />} sx={headerStyles.authBtn}>
                        Auth
                    </Button>
                </Link>)
                }
            </Box>
        </Toolbar>
    </AppBar>
}

export default Header;