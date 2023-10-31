import { UserType, BlogType } from "../types/types";
import { Box } from "@mui/material";
import { blogStyles } from "./blogList-styles";
import { BlogItem } from "./blogItem";

type Props = {
    blogs: BlogType[],
}

const BlogList = (props: Props) => {
    return (
        <Box sx={blogStyles.container}>
            {props.blogs.length > 0 && props.blogs.map((blog: BlogType) => (
                <BlogItem blog={blog} key={blog.id}/>
            ))}
        </Box>
    )
}

export default BlogList;