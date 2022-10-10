import { AddCircle } from "@mui/icons-material";
// import { RemoveCircle } from '@mui/icons-material';
import { Button, CircularProgress, Stack } from "@mui/material";
import React, { Component } from "react";

export default class MapToolbar extends Component {
  render() {
    return (
      <div>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Button
            variant="outlined"
            size="small"
            className="float-end app-button app-button-steel"
            sx={{ border: "none", "&:hover": { border: "none" } }}
            startIcon={<AddCircle />}
            onClick={(e) => {
              this.props.addMap(e);
            }}
          >
            New Map
          </Button>
          {/* Remove all has been 
          temporarily disabled */}
          {/* <Button
            variant="outlined"
            size='small'
            className="float-end app-button app-button-red"
            sx={{ border: "none", "&:hover": { border: "none" } }}
            startIcon={<RemoveCircle />}
            onClick={(e) => {this.props.removeAll(e)}}>
            Remove All Maps
          </Button> */}
          {this.props.syncInProgress && (
            <div
              className="p-0"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div style={{ marginRight: "10px", marginLeft: "10px" }}>
                Syncing Maps
              </div>
              <CircularProgress
                color="inherit"
                size="12px"
                style={{ float: "right" }}
              />
            </div>
          )}
        </Stack>
      </div>
    );
  }
}
