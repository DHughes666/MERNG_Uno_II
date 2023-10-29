import {Box, Typography} from '@mui/material'
import { homepageStyles } from './Homepage-styles';
import {FaBlogger} from 'react-icons/fa'

const Homepage = () => {
    return (
        <Box sx={homepageStyles.container}>
            <Box sx={homepageStyles.wrapper}>
                <Typography>
                    Write and Share your Blog with Millions of People
                    <img src="images/1.jpg" alt="homepage" />
                </Typography>
            </Box>
            <Box sx={homepageStyles.wrapper}>
                <Typography>
                    Write and Share your Blog with Millions of People
                    <img src="images/1.jpg" alt="homepage" />
                </Typography>
            </Box>
            <Box sx={homepageStyles.wrapper}>
                <Typography>
                    Write and Share your Blog with Millions of People
                    <img src="images/1.png" alt="homepage" />
                </Typography>
            </Box>
        </Box>
        
    )
}

export default Homepage;