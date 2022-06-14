import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, Select, FormControl,
         InputLabel, MenuItem, TextField } from "@mui/material";
import Header from "../components/Header";

import "../styles/AllBlogs.css";
import Cookies from "universal-cookie";
import BlogLink from "../components/BlogLink";
import IndexedBlogs from "../components/IndexedBlogs";

const AllBlogs = (props) => {
    const cookie = new Cookies();
    const [token] = useState(cookie.get("token"));
    const [allBlogs, setAllBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [indexedBlogs, setIndexedBlogs] = useState({});
    const [view, setView] = useState("default");
    const [info, setInfo] = useState("");

    // index
    const [indexFieldName, setIndexFieldName] = useState("");
    const [indexInfo, setIndexInfo] = useState("");

    const fetchIndexedBlogs = async () => {
        setIndexInfo("");
        if(indexFieldName === null || indexFieldName === ""){
            setIndexInfo("Cannot index by none please choose a field name");
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_READ_API_URL}/read/Blogs/blog/indexed?fieldName=${indexFieldName}`,{
            method:"GET",
            headers: {
                "authorization": token
            }
        });

        const data = await response.json();
        const { status } = data;
        if(status === "GOOD") {
            setIndexedBlogs(data.content);
            setView("indexed");
            console.log(data.content);
        } else {
            setFilterInfo(data.message);
        }
    }

    const resetIndex = async () => {
        setView("default");
        setIndexFieldName("");
        setIndexInfo("");
    }

    // filter 
    const [fieldName, setFieldName] = useState("");
    const [operation, setOperation] = useState("");
    const [compareTo, setCompareTo] = useState("");
    const [filterInfo, setFilterInfo] = useState("");

    const fetchFilteredBlogs = async () => {
        setFilterInfo("");
        if(fieldName === null || fieldName === "" ||
           operation === null || operation === ""  ||
           compareTo === null || compareTo === ""){
            setFilterInfo("All fields are required");
            return;
        }

        const response = await fetch(
            `${process.env.REACT_APP_READ_API_URL}/read/Blogs/blog/filter?fieldName=${fieldName}&op=${operation}&compareTo=${compareTo}`
            , {
                method:"GET",
                headers: {
                    "authorization": token
                }
            });

        const data = await response.json();
        const { status } = data;
        if(status === "GOOD"){
            setFilteredBlogs(data.content);
            setView("filtered");
        }
    }

    const resetBlogFilter = () => {
        setView("default");
        setCompareTo("");
        setFieldName("");
        setOperation("");
        setFilterInfo("");
    }

    useEffect(() => {
        if(!token) {
            window.location.assign("/");
        }

        fetch(`${process.env.REACT_APP_READ_API_URL}/read/Blogs/blog/document/all`, {
            method:"GET",
            headers: {
                "authorization": token
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "GOOD") {
                setAllBlogs(data.content);
            } else {
                setInfo(data.message);
            }
        })
    },[token]);

    return (
        <Box className="all-blogs-wrapper">
            <Box className="all-blogs">
                <div></div>
                <Box className="main-body">
                    <Header />
                    <Box className="controls">
                        <Paper className="filter-controls">
                            <Typography variant="h4" color="primary"> Filter </Typography>
                            <Box className="filter">
                                <FormControl sx={{ minWidth: 220 }} size="small">
                                    <InputLabel id="select-small">Field Name</InputLabel>
                                    <Select
                                        labelId="select-small"
                                        id="select-small"
                                        label="Field Name"
                                        value={fieldName}
                                        onChange={e => setFieldName(e.target.value)}
                                        color="secondary">
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"blogTitle"}>Blog Title</MenuItem>
                                        <MenuItem value={"createdBy"}>Created By</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ minWidth: 220 }} size="small">
                                    <InputLabel id="select-small">Operation</InputLabel>
                                    <Select
                                        labelId="select-small"
                                        id="select-small"
                                        label="Operation"
                                        value={operation}
                                        onChange={e => setOperation(e.target.value)}
                                        color="secondary">
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"equals"}> == </MenuItem>
                                        <MenuItem value={"notEquals"}> != </MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField size="small" label="Compare To" color="secondary" value={compareTo} onChange={ e => setCompareTo(e.target.value)} />
                                <Button onClick={fetchFilteredBlogs} variant="contained"> Filter </Button>
                                <Button onClick={resetBlogFilter} color="secondary" variant="contained"> Reset Filter </Button>
                            </Box>
                            {filterInfo && <Typography color="primary"> {filterInfo} </Typography>}
                        </Paper>
                        
                        <Paper className="index-controls">
                            <Typography variant="h4" color="primary"> Index </Typography>
                            <Box className="index">
                                <FormControl sx={{ minWidth: 220 }} size="small">
                                    <InputLabel id="select-small">Field Name</InputLabel>
                                    <Select
                                        labelId="select-small"
                                        id="select-small"
                                        label="Field Name"
                                        value={indexFieldName}
                                        onChange={e => setIndexFieldName(e.target.value)}
                                        color="secondary">
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"createdBy"}> Created By </MenuItem>
                                        <MenuItem value={"blogTitle"}> Blog Title </MenuItem>
                                        <MenuItem value={"blogTags"}> Tags </MenuItem>
                                    </Select>
                                </FormControl>
                                <Button onClick={fetchIndexedBlogs} variant="contained"> Index </Button>
                                <Button onClick={resetIndex} color="secondary" variant="contained"> Reset Index </Button>
                            </Box>
                            {indexInfo && <Typography color="primary"> {indexInfo} </Typography>}
                        </Paper>
                    </Box>
                    <Box className="blog-list">
                        { (view === "default" && allBlogs) && allBlogs.map((blog, idx) => {
                            return (
                                <BlogLink blog={blog} key={idx} />
                            )
                        })}
                        { (view === "default" && !allBlogs) && 
                            <Typography className="flex-row-gap align-center">
                                { info }
                            </Typography>
                        }
                        { view === "filtered" && filteredBlogs.map((blog, idx) => {
                            return (
                                <BlogLink blog={blog} key={idx} />
                            )
                        })}
                        { view === "indexed" && 
                            <Box>
                                { Object.keys(indexedBlogs).map((key, idx) => {
                                    return (
                                        <IndexedBlogs key={idx} index={key} blogs={indexedBlogs[key]} />
                                    )
                                })}
                            </Box>    
                        } 
                        
                    </Box>
                </Box>
                <div></div>
            </Box>
        </Box>
    );
}
 
export default AllBlogs;