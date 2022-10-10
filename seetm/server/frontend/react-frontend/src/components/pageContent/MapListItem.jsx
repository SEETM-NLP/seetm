import {
  Cancel,
  Edit,
  ShortText,
  Upload,
  ZoomOutMap,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { Component } from "react";
import TextTag from "../tags/TextTag";
import KeyboardInterface from "../keyboardInterface/KeyboardInterface";
import { localStorageKeys } from "../../configs";
import DeleteModal from "../modal/DeleteModal";
import isEqual from "lodash/isEqual";

export default class MapListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editInProgress: false,
      baseToken: this.props.baseToken,
      eqTokenList: this.props.tokenMap.filter(
        (token) => token !== this.props.baseToken
      ),
      selectedLanguage:
        localStorage.getItem(localStorageKeys.seetmSelectedLang) || "en",
      validity: {
        base_token: {
          validity: "notset",
          helperText: "",
        },
        eq_token: {
          validity: "notset",
          helperText: "",
        },
      },
    };

    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.addEquivalentToken = this.addEquivalentToken.bind(this);
    this.removeEquivalentToken = this.removeEquivalentToken.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.handleBaseTokenChange = this.handleBaseTokenChange.bind(this);
    this.handleBaseTokenTextChange = this.handleBaseTokenTextChange.bind(this);
    this.resetMap = this.resetMap.bind(this);
  }

  handleLanguage(language) {
    this.setState(
      {
        selectedLanguage: language,
      },
      () => {
        localStorage.setItem(`${localStorageKeys.seetmSelectedLang}`, language);
        this.baseTokenRef.handleLanguage(language);
        this.eqTokenRef.handleLanguage(language);
      }
    );
  }

  handleEdit(event) {
    this.setState(
      {
        editInProgress: true,
      },
      () => {
        this.baseTokenRef.handleInputFocus();
      }
    );
  }

  handleCancel(event) {
    this.setState({
      editInProgress: false,
    });
  }

  addEquivalentToken(event) {
    this.setState({
      validity: {
        ...this.state.validity,
        eq_token: {
          validity: "notset",
          helperText: "",
        },
      },
    });

    const eqToken = String(this.eqTokenRef.state.text).trim();

    if (eqToken === "" || eqToken === "undefined") {
      this.setState({
        validity: {
          ...this.state.validity,
          eq_token: {
            validity: "invalid",
            helperText: "Invalid equivalent token",
          },
        },
      });
    } else if (
      Object.values(this.props.maps).flat(1).includes(eqToken) &&
      !this.props.tokenMap.includes(eqToken) &&
      this.props.baseToken !== eqToken
    ) {
      this.setState({
        validity: {
          ...this.state.validity,
          eq_token: {
            validity: "invalid",
            helperText: "Equivalent token is already present in existing maps",
          },
        },
      });
    } else {
      if (
        !this.state.eqTokenList.includes(eqToken) &&
        this.state.baseToken !== eqToken
      ) {
        this.setState({
          eqTokenList: [...this.state.eqTokenList, eqToken],
        });
      } else {
        this.setState({
          validity: {
            ...this.state.validity,
            eq_token: {
              validity: "invalid",
              helperText: "Equivalent token already exists",
            },
          },
        });
      }
    }
  }

  removeEquivalentToken(token) {
    const eqToken = String(token).trim();
    if (this.state.eqTokenList.includes(eqToken)) {
      this.setState({
        eqTokenList: this.state.eqTokenList.filter((elem) => elem !== eqToken),
      });
    }
  }

  handleBaseTokenChange(event) {
    this.setState({
      baseToken: event.target.value,
      eqTokenList: this.state.eqTokenList.filter(
        (elem) => elem !== event.target.value
      ),
    });
  }

  handleBaseTokenTextChange(text) {
    this.setState({
      baseToken: text,
      eqTokenList: this.state.eqTokenList.filter((elem) => elem !== text),
    });
  }

  resetMap() {
    this.baseTokenRef.setText(this.props.baseToken);
    this.eqTokenRef.setText("");
    this.setState({
      eqTokenList: this.props.tokenMap,
      validity: {
        base_token: {
          validity: "notset",
          helperText: "",
        },
        eq_token: {
          validity: "notset",
          helperText: "",
        },
      },
      editInProgress: false,
    });
  }

  updateMap(event) {
    this.setState({
      validity: {
        ...this.state.validity,
        base_token: {
          validity: "notset",
          helperText: "",
        },
        eq_token: {
          validity: "notset",
          helperText: "",
        },
      },
    });

    const map = {
      base_token: String(this.state.baseToken).trim(),
      equivalent_tokens: this.state.eqTokenList,
    };

    if (map?.base_token === "") {
      this.setState({
        validity: {
          ...this.state.validity,
          base_token: {
            validity: "invalid",
            helperText: "Base token cannot be empty",
          },
        },
      });
    } else if (
      Object.values(this.props.maps).flat(1).includes(map?.base_token) &&
      this.props.baseToken !== map?.base_token
    ) {
      this.setState({
        validity: {
          ...this.state.validity,
          base_token: {
            validity: "invalid",
            helperText: "Base token is already present in existing maps",
          },
        },
      });
    } else if (map?.equivalent_tokens.length === 0) {
      this.setState({
        validity: {
          ...this.state.validity,
          eq_token: {
            validity: "invalid",
            helperText: "Equivalent token list cannot be empty",
          },
        },
      });
    } else {
      if (
        map?.base_token === this.props.baseToken &&
        isEqual(this.props?.tokenMap.sort(), map?.equivalent_tokens.sort())
      ) {
        this.handleCancel();
        this.props.triggerSnack("Nothing changed!", "success");
      } else {
        this.props.updateMap(this.props.baseToken, map);
      }
      this.resetMap();
    }
  }

  render() {
    const iconButtonTheme = createTheme({
      palette: {
        type: "light",
        primary: {
          main: "#4CAF50",
          contrastText: "rgba(255,255,255,0.87)",
        },
        secondary: {
          main: "#0090f5",
        },
        text: {
          primary: "rgba(0,0,0,0.87)",
        },
      },
    });

    return (
      <>
        {this.state.editInProgress === true ? (
          <Box className="p-3 container-middle container-bg-platinum-onyx app-add-mapping mx-0 mb-0">
            <Stack
              className={"mb-3"}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <ZoomOutMap className="app-text-icon" fontSize="medium" />
              <Typography noWrap className={"w-100"}>
                Create new Token Map
              </Typography>
              <Box className={"w-100"}>
                <Stack
                  direction={"row-reverse"}
                  spacing={1}
                  alignItems={"center"}
                >
                  <Button
                    variant="contained"
                    size="small"
                    className="float-end material-green"
                    sx={{ border: "none", "&:hover": { border: "none" } }}
                    startIcon={<Upload />}
                    onClick={(e) => {
                      this.updateMap(e);
                    }}
                  >
                    Save Map
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    className="float-end app-button-map"
                    sx={{ border: "none", "&:hover": { border: "none" } }}
                    startIcon={<Cancel />}
                    onClick={(e) => {
                      this.handleCancel(e);
                    }}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Box>
            </Stack>
            <Box>
              <Stack direction="row" spacing={2}>
                <Stack spacing={2}>
                  <KeyboardInterface
                    value={this.props.baseToken}
                    interface={"textfield"}
                    className={"w-40 app-input-map"}
                    disableUnderline={true}
                    defaultLanguage={
                      this.props.appSinhala
                        ? localStorage.getItem(
                            `${localStorageKeys.seetmSelectedLang}`
                          ) || "si"
                        : "en"
                    }
                    ref={(baseTokenRef) => (this.baseTokenRef = baseTokenRef)}
                    handleShortcut={this.handleLanguage}
                    handleChange={this.handleBaseTokenChange}
                    handleTextChange={this.handleBaseTokenTextChange}
                    enableShortcuts={this.props.appSinhala ? true : false}
                    shortcutKey={81}
                    error={
                      this.state.validity.base_token.validity === "invalid"
                        ? true
                        : false
                    }
                    helperText={
                      this.state.validity.base_token.validity === "invalid"
                        ? this.state.validity.base_token.helperText
                        : ""
                    }
                  />
                </Stack>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <Stack spacing={2}>
                    <KeyboardInterface
                      placeholder={"Equivalent Token"}
                      className={"app-input-map"}
                      id={"eq-token-input"}
                      interface={"textfield"}
                      disableUnderline={true}
                      defaultLanguage={
                        this.props.appSinhala
                          ? localStorage.getItem(
                              `${localStorageKeys.seetmSelectedLang}`
                            ) || "si"
                          : "en"
                      }
                      ref={(eqTokenRef) => (this.eqTokenRef = eqTokenRef)}
                      handleShortcut={this.handleLanguage}
                      handleEnter={this.addEquivalentToken}
                      enableShortcuts={this.props.appSinhala ? true : false}
                      error={
                        this.state.validity.eq_token.validity === "invalid"
                          ? true
                          : false
                      }
                      helperText={
                        this.state.validity.eq_token.validity === "invalid"
                          ? this.state.validity.eq_token.helperText
                          : ""
                      }
                    />
                  </Stack>
                  <Stack spacing={2} className={"pt-1"}>
                    <ThemeProvider theme={iconButtonTheme}>
                      <IconButton
                        aria-label="add"
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          this.addEquivalentToken(e);
                        }}
                        className={"material-green material-white-f"}
                      >
                        <AddIcon />
                      </IconButton>
                    </ThemeProvider>
                  </Stack>
                </Stack>
              </Stack>
              {(this.state.eqTokenList !== undefined &&
                this.state.eqTokenList.length !== 0) ||
              this.baseToken !== "" ? (
                <Stack
                  className={"mt-3"}
                  direction={"row"}
                  display={"flex"}
                  flexWrap={"wrap"}
                >
                  {String(this.state.baseToken).trim() !== "" && (
                    <TextTag text={this.state.baseToken} color="#212121" />
                  )}
                  {this.state.eqTokenList.map((token, index) => {
                    return (
                      <TextTag
                        key={index}
                        text={token}
                        color="#212121"
                        onDelete={(e) => {
                          this.removeEquivalentToken(token);
                        }}
                      />
                    );
                  })}
                </Stack>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        ) : (
          <Box className="p-3 container-middle container-bg-platinum-onyx app-add-mapping mx-0 mb-0">
            <Stack
              className={"mb-3"}
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <ShortText className="app-text-icon" fontSize="medium" />
              <Typography noWrap className={"w-100"}>
                {this.props.baseToken}
              </Typography>
              <Stack direction="row-reverse" spacing={1} className={"w-100"}>
                <Button
                  variant="contained"
                  size="small"
                  className="float-end material-purple"
                  sx={{ border: "none", "&:hover": { border: "none" } }}
                  startIcon={<Edit />}
                  onClick={(e) => {
                    this.handleEdit(e);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  className="float-end app-button-map"
                  sx={{ border: "none", "&:hover": { border: "none" } }}
                  startIcon={<Cancel />}
                  data-bs-toggle="modal"
                  data-bs-target={`#map${this.props.index}${this.props.baseToken}`}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
            <Box>
              {this.props?.tokenMap !== undefined &&
              this.props?.tokenMap.length !== 0 ? (
                <Stack direction="column" spacing={1} alignItems={"flex-start"}>
                  <Stack
                    className={"mt-0"}
                    direction={"row"}
                    display={"flex"}
                    flexWrap={"wrap"}
                  >
                    <TextTag text={this.props.baseToken} color="#212121" />
                    {this.props?.tokenMap.map((token, index) => {
                      return (
                        <TextTag key={index} text={token} color="#212121" />
                      );
                    })}
                  </Stack>
                </Stack>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        )}
        <DeleteModal
          id={`map${this.props.index}${this.props.baseToken}`}
          title={`Delete Map`}
          body={`Do you want to permenently delete the map under the base token "${this.props.baseToken}"?`}
          item={`${this.props.baseToken}`}
          deleteHandler={this.props.deleteMap}
          buttonPrimary={{
            button: true,
            buttonClass:
              "app-button-red model-delete-modal-button model-delete-modal-button-primary",
            buttonType: "error",
            buttonVarient: "contained",
            buttonText: "Confirm",
          }}
          buttonSecondary={{
            button: true,
            buttonClass:
              "app-button-steel model-delete-modal-button model-delete-modal-button-secondary",
            buttonType: "secondary",
            buttonVarient: "contained",
            buttonText: "Deny",
          }}
        />
      </>
    );
  }
}
