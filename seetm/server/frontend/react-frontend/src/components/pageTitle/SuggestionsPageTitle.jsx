import React, { Component } from "react";
import { Typography } from "@mui/material";

export default class SuggestionsPageTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingMapsInProgress: this.props.fetchingMapsInProgress,
    };
  }

  render() {
    return (
      <div className="row mb-1">
        <div className="col w-100 mx-0 px-0 justify-content-between d-inline-block">
          <Typography
            variant="h6"
            className="float-start h-100 mt-1 dime-page-title"
          >
            <strong>Suggestions</strong>
          </Typography>
        </div>
      </div>
    );
  }
}
