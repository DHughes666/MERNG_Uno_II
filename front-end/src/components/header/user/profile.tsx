//@ts-nocheck
import { Box, Typography, Avatar, LinearProgress } from "@mui/material";
import { profileStyles } from "./profile-styles";
import { BlogItem } from "../../blogs/blogItem";
import { useQuery } from "@apollo/client";
import { GET_USER_BLOGS } from "../../graphql/queries";

const Profile = () => {
    const {loading, data, error} = useQuery(GET_USER_BLOGS, {
        variables: {
            id: JSON.parse(localStorage.getItem('userData') as string).id,
        },
    }
        );

    if(error) {
        return <p>ERROR</p>
    }
        
  return loading ? <LinearProgress/> : data && (
    <Box sx={profileStyles.container}>
        <Box sx={profileStyles.blogsContainer}>
            <Typography variant="h3" sx={profileStyles.text}>
                My Posts
            </Typography>
            <Box sx={profileStyles.cardsContainer}>
                {data.user.blogs.map((item) => (
                    <BlogItem key={item.id}
                    blog={{
                        title: item.title,
                        content: item.content,
                        date: item.date,
                        id: item.id,
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