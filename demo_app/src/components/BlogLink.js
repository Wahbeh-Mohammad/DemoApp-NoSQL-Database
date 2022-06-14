import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import "../styles/BlogLink.css"

const BlogLink = (props) => {
    const { blog } = props;
    const { _id, blogTitle, createdBy, blogTags } = blog;

    return (
        <Paper elevation={5} className="blog-link">   
            <Typography variant="h4" color="primary"> Blog Title: { blogTitle } </Typography>
            <Typography variant="h6"> Created By: { createdBy } </Typography>
            <Typography variant="h6"> Tags: {blogTags} </Typography>
            <Link className="link" to={`/blogs/${_id}`}> <Button variant="contained" color="secondary"> Read more! </Button> </Link>
        </Paper>
    );
}
 
export default BlogLink;