// HelpPage.js
import { Box, useTheme } from "@mui/material";
import Header from "./Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import React from "react";

function HelpPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Using the application
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Create accounts and once your account is approved by the admin, you will be able to use it
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Techstack used by the application
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The application uses ReactJs frontend, Flask backend and MySQL database
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Future functionalities
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We want to make the application more robust
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Who made this application
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Application was made by Pranav Narayan, Ankita Gupta, Bhanu Gupta
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default HelpPage;
