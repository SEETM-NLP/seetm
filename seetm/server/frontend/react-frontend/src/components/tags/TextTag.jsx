import { Cancel } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { Component } from "react";

export default class TextTag extends Component {
  render() {
    const iconButtonTheme = createTheme({
      palette: {
        type: "light",
        primary: {
          main: this.props.closeButtonColor || "#CFD8DC",
          contrastText: this.props.closeButtonTextColor || "#000000",
        },
        secondary: {
          main: this.props.secondaryColor || "#0090f5",
        },
      },
    });

    function getPadding(size) {
      if (size === "small") {
        return 0;
      } else if (size === "medium" || size === "large") {
        return 1;
      } else {
        return 0;
      }
    }

    function getFontSize(size) {
      if (size === "small") {
        return 0.8;
      } else if (size === "medium" || size === "large") {
        return 1;
      } else {
        return 0.8;
      }
    }

    return (
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        className={`p-${getPadding(
          this.props.size || "small"
        )} rounded rounded-3 ps-3 m-1 ${
          this.props.onDelete === undefined && "pe-3 py-2"
        }`}
        sx={{
          color: this.props.textColor || "#f1f1f1",
          backgroundColor: this.props.color || "#4CAF50",
          // border: `2px solid ${this.props.borderColor || 'transparent'}`
        }}
      >
        <Typography
          varient="subtitle"
          color={this.props.textColor || "#f1f1f1"}
          sx={{ fontSize: `${getFontSize(this.props.size || "small")}rem` }}
        >
          {this.props.text || "Tag Name"}
        </Typography>
        {this.props.onDelete && (
          <ThemeProvider theme={iconButtonTheme}>
            <IconButton
              className="app-text-tag-close"
              aria-label="delete"
              size="small"
              color="primary"
              onClick={(e) => {
                this.props.onDelete(e);
              }}
            >
              <Cancel />
            </IconButton>
          </ThemeProvider>
        )}
      </Stack>
    );
  }
}
