//@ts-nocheck
import { Box, Typography, Avatar } from "@mui/material";
import { profileStyles } from "./profile-styles";
import { BlogItem } from "../../blogs/blogItem";
import {RxAvatar} from 'react-icons/rx'

const Profile = () => {
  return (
    <Box sx={profileStyles.container}>
        <Box sx={profileStyles.blogsContainer}>
            <Typography variant="h3" sx={profileStyles.text}>
                My Posts
            </Typography>
            <Box sx={profileStyles.cardsContainer}>
                {[1, 2, 3, 4, 5].map((item) => (
                    <BlogItem  
                    blog={{
                        title: item.toString(),
                        content: item.toString(),
                        date: new Date(),
                        id: item.toString(),
                    }}
                    />
                ))}
            </Box>
        </Box>
        <Box sx={profileStyles.profileContainer}>
            <Box sx={profileStyles.userContainer}>
                <Avatar sx={profileStyles.avatar}></Avatar>
                <Typography variant="h3" fontFamily="Work Sans">
                    Des Hughes
                </Typography>
                <Typography variant="h4" fontFamily="Work Sans">
                    graziemolto6@gmail.com
                </Typography>
                <Typography variant="h4" fontFamily="monospace">
                    You wrote {10} Blogs 😉 🙌
                </Typography>
            </Box>
        </Box>
    </Box>
  )
}

export default Profile;