import { Upload, ZoomOutMap } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { Component } from "react";
import TextTag from "../tags/TextTag";
import KeyboardInterface from "../keyboardInterface/KeyboardInterface";
import { localStorageKeys } from "../../configs";
// import { Chip } from '@mui/material';
// import ScrollContainer from 'react-indiana-drag-scroll';

export default class MapListAddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseToken: "",
      eqTokenList: [],
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
    this.addEquivalentToken = this.addEquivalentToken.bind(this);
    this.removeEquivalentToken = this.removeEquivalentToken.bind(this);
    this.saveMap = this.saveMap.bind(this);
    this.handleBaseTokenChange = this.handleBaseTokenChange.bind(this);
    this.handleBaseTokenTextChange = this.handleBaseTokenTextChange.bind(this);
    this.resetMap = this.resetMap.bind(this);
  }

  componentDidMount() {
    this.baseTokenRef.handleInputFocus();
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
    } else if (Object.values(this.props.maps).flat(1).includes(eqToken)) {
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
    if (this.state.eqTokenList.includes(token)) {
      this.setState({
        eqTokenList: this.state.eqTokenList.filter((elem) => elem !== token),
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
    this.baseTokenRef.setText("");
    this.eqTokenRef.setText("");
    this.setState({
      baseToken: "",
      eqTokenList: [],
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
    });
  }

  saveMap(event) {
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
      Object.values(this.props.maps).flat(1).includes(map?.base_token)
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
      this.props.saveMap(map);
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
        {/* <Box className="p-1 container-middle container-bg-platinum-onyx app-add-mapping mx-0 mb-0">
          <Stack direction="row" spacing={1} alignItems="center" >
            <Typography variant={"body2"} className="px-1">Suggestions</Typography>
            <ScrollContainer className="scroll-container" horizontal={true} vertical={false} >
              <Stack direction="row" spacing={1} className={"overflow-y"} >
                {this.props.tokens.map((suggestion, index) => {
                  return (
                    <Chip key={index} label={suggestion} />
                  );
                })}
              </Stack>
            </ScrollContainer>
          </Stack>
        </Box> */}
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
              <Button
                variant="contained"
                size="small"
                className="float-end material-green"
                sx={{ border: "none", "&:hover": { border: "none" } }}
                startIcon={<Upload />}
                onClick={(e) => {
                  this.saveMap(e);
                }}
              >
                Save Map
              </Button>
            </Box>
          </Stack>
          <Box>
            <Stack direction="row" spacing={2}>
              <Stack spacing={2}>
                <KeyboardInterface
                  placeholder="Base Token"
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
      </>
    );
  }
}
