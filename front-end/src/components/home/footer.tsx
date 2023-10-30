import {Box, Button} from "@mui/material"
import { homepageStyles } from "./Homepage-styles"

const Footer = () => {
    return <Box sx={homepageStyles.footerContainer}>
        <Button variant="contained" sx={homepageStyles.footerBtn}>
            View Articles
        </Button>
        <Button variant="contained" sx={homepageStyles.footerBtn}>
            Publish One
        </Button>
    </Box>
}

export default Footer;