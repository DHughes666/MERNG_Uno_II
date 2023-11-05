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
            </Box>
        </Box>
    </Box>
  )
}

export default Profile;