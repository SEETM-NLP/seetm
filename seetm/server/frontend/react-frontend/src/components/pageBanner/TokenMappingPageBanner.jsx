import { Box } from "@mui/material";
import React, { Component } from "react";
import { configs } from "../../configs";
import AppTile from "./AppTile";

export default class TokenMappigPageBanner extends Component {
  render() {
    return (
      <>
        <Box
          className="row row-cols-1 row-cols-lg-1"
          justifyContent="space-between"
          sx={{ marginY: 2 }}
        >
          <AppTile
            bgcolor=""
            spacing="ps-0 ps-lg-0 pt-2 pt-lg-0"
            icon="code"
            iconColor="material-blue-f"
            count=""
            title=" Sinhala-English Equivalent Token Mapping"
            content="Map Equivalent tokens into a single token to improve performance of the underlying mahine learning models."
            button={{
              button: false,
              buttonText: "",
              buttonType: "app-button-steel",
              externalLink: true,
              link: `${configs.seetmDocsHost}`,
            }}
            customButton=""
          />
        </Box>
      </>
    );
  }
}
