import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import Cookies from "universal-cookie";

const Header = (props) => {
    const cookie = new Cookies();

    const handleLogout = () => {
        cookie.remove("token");
        window.location.assign("/");
    } 

    return (
        <Box className="header" sx={{background:"#020c3f"}}>
            <Typography variant="h4" color="secondary"> Blog Application </Typography>
            <Box>
                <Link to="/blogs" className="link" color="secondary"> All Blogs </Link>
            </Box>
            <Box>
                <Button color="secondary" size="large" variant="contained" onClick={handleLogout}> Logout </Button>
            </Box>
        </Box>
    );
}
 
export default Header;
