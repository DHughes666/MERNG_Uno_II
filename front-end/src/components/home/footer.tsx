import {Box, Button, Typography} from "@mui/material"
import { homepageStyles } from "./Homepage-styles"

const Footer = () => {
    return <Box sx={homepageStyles.footerContainer}>
        <Button variant="contained" sx={homepageStyles.footerBtn}>
            View Articles
        </Button>
        <Typography sx={homepageStyles.footerText}>
            Designed by Prome
        </Typography>
        <Button variant="contained" sx={homepageStyles.footerBtn}>
            Publish One
        </Button>
    </Box>
}

export default Footer;