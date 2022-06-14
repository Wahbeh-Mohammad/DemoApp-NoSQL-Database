import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import themeOptions from "./theme/themeProps";
import { AllBlogs, Login, SpecificBlog } from "./views";

import "./styles/global.css";

function App() {
  return (
    <ThemeProvider theme={themeOptions}>
      <Router>
        <Routes>
            <Route exact path="/" element={ <Login/> } />
            <Route exact path="/blogs" element={ <AllBlogs /> } />
            <Route exact path="/blogs/:id" element={ <SpecificBlog /> }/>
        </Routes>
      </Router>        
    </ThemeProvider>
  );
}

export default App;
