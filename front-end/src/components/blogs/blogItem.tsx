import { BlogType } from "../types/types"
import { Card, Box, Typography } from "@mui/material";
import { blogStyles } from "./blogList-styles";

type Props = {
    blog: BlogType;
};

export const BlogItem = (props: Props) => {
  return (
    <Card sx={blogStyles.card}>
        <Box sx={blogStyles.cardHeader}>
            <Box>
                <Typography>
                    {new Date(props.blog.date).toLocaleDateString()}
                </Typography>
            </Box>
            <Typography variant="h4" sx={blogStyles.title}>
                {props.blog.title}
            </Typography>
            <Box sx={blogStyles.cardContent}>
                <Typography variant="h4" sx={blogStyles.contentText}>
                    {props.blog.content}
                </Typography>
            </Box>
        </Box>
    </Card>
  )
}
