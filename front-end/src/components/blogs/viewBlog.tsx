import { Box, Typography, LinearProgress, Dialog, DialogContent } from "@mui/material";
import { blogPageStyles } from "./viewBlog-styles";
import { useQuery } from "@apollo/client";
import { GET_BLOG_BY_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { ImMail } from "react-icons/im";

const ViewBlog = () => {
    const id = useParams().id;
    const {data, error, loading} = useQuery(GET_BLOG_BY_ID, {
        variables: {  
            id: id
        }
    });
    if(loading) {
        return <LinearProgress />;
    }
    if (error) {
        return <Dialog open={true}>
            <DialogContent>
                Error fetching blog
            </DialogContent>
        </Dialog>
    }
  return data && (
    <Box sx={blogPageStyles.container}>
        <Box sx={blogPageStyles.profileHeader}>
            <Typography sx={blogPageStyles.headerText}>
            {data.blog.user.name}
            </Typography>
            <Box sx={blogPageStyles.profileHeaderItems}>
                <ImMail />
                <Typography sx={blogPageStyles.headerTex}>
                    {data.blog.user.email}
                </Typography>
            </Box>
        </Box>
        <Typography sx={blogPageStyles.blogTitle}>
            {data.blog.title}
        </Typography>
        <Typography sx={blogPageStyles.blogContent}>
            {data.blog.content}
        </Typography>
    </Box>
  )
}

export default  ViewBlog;