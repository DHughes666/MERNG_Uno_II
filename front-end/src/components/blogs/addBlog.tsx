import { Box, Typography, Button } from "@mui/material";
import {useRef, useState} from 'react';
import { addStyles, htmlElmStyles } from "./addBlog-styles";
import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "../graphql/mutations";

const AddBlog = () => {
    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const contentRef = useRef<HTMLParagraphElement | null>(null);
    
    const [addBlog] = useMutation(ADD_BLOG);

    const handleAddBlog = async () => {
        if(headingRef.current && 
            (headingRef.current?.innerText.trim().length > 0) &&
            contentRef.current &&
            (contentRef.current?.innerText.trim().length > 0)
          ) {
            const title = headingRef.current.innerText;
            const content = contentRef.current.innerText;
            const date = new Date()
            const user = JSON.parse(localStorage.getItem("userData") as string).id;
            
            try {
                const res = await addBlog({
                    variables: {
                        title, content, date, user
                    },
                })
                const data = await res.data;
                console.log(data);
                
            } catch (err: any) {
                console.log(err.message);
                
            }
            
          }
    }

    
  return (
    <Box sx={addStyles.container}>
        <Box sx={addStyles.blogHeader}>
            <Typography>Authored by: Christine</Typography>
            <Button 
                onClick={handleAddBlog}
                color="success" 
                variant="contained"
            >
                publish
            </Button>
        </Box>
        <form>
            <Box sx={addStyles.formContainer}>
                <h2 ref={headingRef} style={htmlElmStyles.h2} 
                    placeholder="Title..."
                    contentEditable>
                        Post Your Title
                    </h2>
                <p ref={contentRef} style={htmlElmStyles.p} 
                    contentEditable> 
                    Post your story here  
                </p>
            </Box>
        </form>
    </Box>
  )
}

export default AddBlog;
 