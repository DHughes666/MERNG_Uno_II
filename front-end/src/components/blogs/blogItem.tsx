import { BlogType } from "../types/types"
import { Card, Box, Typography } from "@mui/material";
import {FcCalendar} from 'react-icons/fc'
import { blogStyles, randomBgColor } from "./blogList-styles";

type Props = {
    blog: BlogType;
};

export const BlogItem = (props: Props) => {
  return (
    <Card sx={blogStyles.card}>
        <Box sx={{...blogStyles.cardHeader, bgcolor: randomBgColor()}}>
            <Box sx={blogStyles.dateContainer}>
                <FcCalendar size={"30px"} />
                <Typography fontSize={'20px'} color={'white'} variant="caption">
                    {new Date (Number(props.blog.date)).toDateString()}
                </Typography>
            </Box>
            <Typography variant="h4" sx={blogStyles.title}>
                {props.blog.title}
            </Typography>
        </Box>
        <Box sx={blogStyles.cardContent}>
            <Typography variant="h4" sx={blogStyles.contentText}>
                {props.blog.content}
            </Typography>
        </Box>
    </Card>
  )
}
