import { useState } from 'react'
import { Box, AppBar, Toolbar, Tabs, Tab, Button } from "@mui/material";
import { ImBlogger } from "react-icons/im"
import { headerStyles } from "./header-styles";
import { BiLogInCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const Header = () => {
    const [value, setValue] = useState(0)
    return <AppBar sx={headerStyles.appBar}>
        <Toolbar>
            <ImBlogger 
            size={'30px'}
            style={{
                borderRadius: "50%", padding: "10px",
                backgroundColor: "#6c5252"
            }} />
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
                {/* Method II of linking routes */}
                <Link style={{textDecoration: "none"}} to="/auth">
                    <Button endIcon={<BiLogInCircle />} sx={headerStyles.authBtn}>
                        Auth
                    </Button>
                </Link>
            </Box>
        </Toolbar>
    </AppBar>
}

export default Header;