import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'universal-cookie';
import { Box, Divider, Paper, Typography } from "@mui/material";
import Header from "../components/Header";
import CreateIcon from '@mui/icons-material/Create';
import TagIcon from '@mui/icons-material/Tag';

import "../styles/SpecificBlog.css";

const SpecificBlogs = (props) => {
    const cookie = new Cookies();
    const { id } = useParams();
    const [token] = useState(cookie.get("token"));
    const [blog, setBlog] = useState(null);
    const [info, setInfo] = useState("");

    useEffect(()=>{
        if(!token) {
            window.location.assign("/");
        }

        fetch(`${process.env.REACT_APP_READ_API_URL}/read/Blogs/blog/document?documentId=${id}`,{
            method:"GET",
            headers: {
                "authorization": token
            }
        })
        .then( (response) => response.json() )
        .then( data => {
            if(data.status === "GOOD") {
                setBlog(data.content);
            } else {
                setInfo("Blog not found");
            }
        } )
    }, [token, id]);
    
    return (
        <Box className="blog-wrapper">
            <Box className="blog">
                <div></div> {/*grid spacer*/}
                { blog && 
                    <Box className="blog-body">
                        <Header/>
                        <Paper elevation={5} className="blog-details">
                            <Box className="blog-section">
                                <Typography variant="h3" color="primary" className="align-center"> 
                                    {blog.blogTitle} 
                                </Typography>
                            </Box>
                            <Divider/>
                            <Box className="blog-section">
                                <Typography variant="h4" color="primary" className="align-center">
                                    {blog.blogContent} 
                                </Typography>
                            </Box>
                            <Divider/>
                            <Box className="blog-section">
                                <Typography variant="h4" color="primary" className="align-center"> 
                                    <CreateIcon fontSize="large" /> Written by: {blog.createdBy} 
                                </Typography>
                            </Box>
                            <Divider/>
                            <Box className="blog-section">
                                <Typography variant="h4" color="primary" className="align-center"> 
                                    Tags
                                </Typography>
                                {blog.blogTags && blog.blogTags.map((tag, idx) => {
                                    return (
                                        <Typography key={idx} variant="h4" color="primary" className="align-center"> 
                                            <TagIcon fontSize="large"/> { tag } 
                                        </Typography>
                                    )
                                })}
                            </Box>
                        </Paper>
                    </Box>
                }
                { (info && !blog) && 
                    <Box className="blog-body">
                        <Header />
                        <Typography variant="h3" color="primary" className="flex-row-gap padding align-center">{info}</Typography> 
                    </Box>
                }
                <div></div> {/*grid spacer*/}
            </Box>
        </Box>
    );
}
 
export default SpecificBlogs;