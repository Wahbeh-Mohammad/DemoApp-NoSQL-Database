import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BlogLink from "./BlogLink";

const IndexedBlogs = (props) => {
    const { index, blogs } = props;

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color="primary"> {index} </Typography>
            </AccordionSummary>
            <AccordionDetails className="blog-list">
                { blogs.map((blog,idx) => { 
                    return (<BlogLink key={idx} blog={blog}/>)
                })}
            </AccordionDetails>
      </Accordion>
    );
}
 
export default IndexedBlogs;