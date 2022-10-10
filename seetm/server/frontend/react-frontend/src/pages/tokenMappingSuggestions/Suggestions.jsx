import { Box } from "@mui/material";
import React, { Component } from "react";
import SuggestionsPageTitle from "../../components/pageTitle/SuggestionsPageTitle";

export default class Suggestions extends Component {
  render() {
    return (
      <div className="app-main">
        <Box className="main-section m-0 p-0" id="main-section-dashboard">
          <SuggestionsPageTitle />
        </Box>
      </div>
    );
  }
}
