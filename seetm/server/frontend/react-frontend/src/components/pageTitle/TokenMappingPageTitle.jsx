import React, { Component } from "react";
import { Button, Typography } from "@mui/material";
import { Article, ZoomInMap } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { configs } from "../../configs";

export default class TokenMappingPageTitle extends Component {
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
            <strong>SEETM</strong>
          </Typography>
          <Button
            variant="outlined"
            role={"link"}
            href={configs.seetmDocsHost}
            target={"_blank"}
            startIcon={<Article />}
            sx={{ border: "none", "&:hover": { border: "none" } }}
            className="float-end app-button app-button-steel mb-md-0 mb-sm-0 mx-2"
          >
            Docs
          </Button>
          {this.props.fetchingMapsInProgress ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<ZoomInMap />}
              variant="outlined"
              className="float-end explanation-loading-button"
              size="1.5rem"
              sx={{ height: "2.4rem" }}
              disabled
            >
              Rebuilding Maps
            </LoadingButton>
          ) : (
            <Button
              variant="outlined"
              startIcon={<ZoomInMap />}
              sx={{ border: "none", "&:hover": { border: "none" } }}
              className="float-end app-button app-button-green mb-md-0 mb-sm-0 mx-2"
              onClick={(e) => {
                this.props.fetchMaps(e);
              }}
            >
              Rebuild Maps
            </Button>
          )}
        </div>
      </div>
    );
  }
}
