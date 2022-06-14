import React, { useState } from "react";
import Cookies from "universal-cookie";
import { Box, TextField, Typography, Button, Paper } from "@mui/material";

import "../styles/Login.css";

const Login = (props) => {
    const cookie = new Cookies();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [info, setInfo] = useState("");

    const handleLogin = () => {
        setInfo("");
        if(username == null || username === "") {
            setInfo("Invalid username");
            return;
        }
        if(password == null || password === "") {
            setInfo("Invalid password");
            return;
        }

        fetch(`${process.env.REACT_APP_READ_API_URL}/auth/login`, {
            method:"POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "GOOD") {
                cookie.set("token", data.content);
                window.location.assign("/blogs");
            } else {
                setInfo(data.message);
            }
        });
    }

    return (
        <Box className="login-wrapper">
            <Paper elevation={6} className="login">
                <Typography variant="h2" color="primary">
                    Login
                </Typography>
                <TextField label="Username" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
                <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <Button color="secondary" variant="contained" size="large" onClick={handleLogin}> Login </Button>
                { info && <Typography align="center" variant="h5" color="primary"> {info} </Typography> }
            </Paper>
        </Box>
    );
}
 
export default Login;