import { AppBar, Toolbar } from "@mui/material";
import { ImBlogger } from "react-icons/im"

const Header = () => {
    return <AppBar>
        <Toolbar>
            <ImBlogger />
        </Toolbar>
    </AppBar>
}

export default Header;