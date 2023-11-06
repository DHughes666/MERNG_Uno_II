import { Box, Typography, 
    LinearProgress, Dialog, 
    DialogContent, TextField, IconButton, Avatar } from "@mui/material";
import { blogPageStyles } from "./viewBlog-styles";
import { useQuery } from "@apollo/client";
import { GET_BLOG_BY_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";
import { ImMail } from "react-icons/im";
import { BiSend } from "react-icons/bi";
import { FaComments } from "react-icons/fa"; 
import {BsCalendar2DateFill} from "react-icons/bs";

const getInitials = (name: string) => {
    return `${name[0]}`;
}

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
                <Box sx={blogPageStyles.blogDate}>
                    <BsCalendar2DateFill />
                    <Typography fontFamily="Work sans" fontWeight="500">
                    {new Date(Number(data.blog.date)).toDateString()}
                    </Typography>
                </Box>
            </Box> 
        </Box>
        <Typography sx={blogPageStyles.blogTitle}>
            {data.blog.title}
        </Typography>
        <Typography sx={blogPageStyles.blogContent}>
            {data.blog.content}
        </Typography>
        <Box sx={blogPageStyles.commentBox}>
            Comments: {"  "}
            <IconButton>
                <FaComments size={'30'}/>
            </IconButton>
        </Box>
        <Box sx={blogPageStyles.commentInputContainer}>
            <Typography margin={2} fontFamily={"Arvo"}>
                Add Your Comment
            </Typography>
            <Box sx={blogPageStyles.inputLayout}>
                <TextField
                type="textarea"
                sx={blogPageStyles.textField}
                InputProps={{
                    style: {
                        width: "60vw",
                        borderRadius: "15px",
                        fontFamily: "Work sans"
                    },
                    endAdornment: (
                        <IconButton>
                            <BiSend size="25"/>
                        </IconButton>
                    )
                }}
                />
                
            </Box>
        </Box>
        {data.blog.comments.length > 0 && (
        <Box sx={blogPageStyles.comments}>
            {data.blog.comments.map((comment: any) => (
                <Box key={comment.id} sx={blogPageStyles.commentItem}>
                    <Avatar sx={blogPageStyles.avatarr}>
                        {getInitials(comment.user.name)}
                    </Avatar>
                    <Typography sx={blogPageStyles.commentText}>
                        {comment.text}
                    </Typography>
                </Box>

            ))}
        </Box>
        )
        }
        
    </Box>
  )
}

export default  ViewBlog;