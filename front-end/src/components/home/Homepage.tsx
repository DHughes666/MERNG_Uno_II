import {Box, Typography} from '@mui/material'
import { homepageStyles } from './Homepage-styles';

const Homepage = () => {
    return (
        <Box sx={homepageStyles.container}>
            <Box sx={homepageStyles.wrapper}>
                    <img 
                        width="50%" 
                        height="50%" 
                        //@ts-ignore
                        style={homepageStyles.image} src="images/1.jpg" alt="homepage" 
                    />
                <Typography sx={homepageStyles.text}>
                    Write and Share your Blog with Millions of People
                </Typography>
            </Box>
            <Box sx={homepageStyles.wrapper}>
                <Typography sx={homepageStyles.text}>
                    Write and Share your Blog with Millions of People
                </Typography>
                    <img 
                        width="50%" 
                        height="50%"
                        //@ts-ignore 
                        style={homepageStyles.image} src="images/2.jpg" alt="homepage" 
                    />
            </Box>
            <Box sx={homepageStyles.wrapper}>
                    <img 
                        width="50%" 
                        height="50%" 
                        //@ts-ignore
                        style={homepageStyles.image} src="images/3.jpg" alt="homepage" 
                    />
                <Typography sx={homepageStyles.text}>
                    Write and Share your Blog with Millions of People
                </Typography>
            </Box>
        </Box>
        
    )
}

export default Homepage;