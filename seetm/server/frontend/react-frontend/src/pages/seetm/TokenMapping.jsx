import React, { Component } from "react";
import TokenMappingPageTitle from "../../components/pageTitle/TokenMappingPageTitle";
import TokenMappingPageBanner from "../../components/pageBanner/TokenMappingPageBanner";
import axios from "axios";
import { Box, CircularProgress, Snackbar, Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { configs } from "../../configs";
import MapToolbar from "../../components/pageToolbars/MapToolbar";
import MapList from "../../components/pageContent/MapList";
import MapListAddItem from "../../components/pageContent/MapListAddItem";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

export default class TokenMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingMapsInProgress: false,
      updateInProgress: false,
      saveInProgress: false,
      syncInProgress: false,
      addInProgress: false,
      removeAllInProgress: false,
      deleteInProgress: false,
      maps: {},
      tokens: [],
      snackbarIsOpen: false,
      snackbarMessage: "",
      snackbarType: "success",
    };

    this.fetchMaps = this.fetchMaps.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.saveMap = this.saveMap.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.addMap = this.addMap.bind(this);
    this.deleteMap = this.deleteMap.bind(this);
    this.syncMaps = this.syncMaps.bind(this);
    this.triggerSnack = this.triggerSnack.bind(this);
  }

  componentDidMount() {
    this.props.setActiveLink("", "seetm");
    this.fetchMaps(); // TODO: UNCOMMENT
  }

  handleSnackbarClose(event) {
    this.setState({ snackbarIsOpen: false });
  }

  removeAll(event) {
    this.setState({
      removeAllInProgress: true,
    });

    // TODO: Rest
  }

  addMap(event) {
    this.setState({
      addInProgress: !this.state.addInProgress,
    });
  }

  updateMap(previousBaseToken, updatedMap) {
    this.setState({
      updateInProgress: true,
    });
    console.log("update called " + previousBaseToken);

    const mapToUpdate = {
      [`${updatedMap.base_token}`]: [
        updatedMap.base_token,
        ...Object.values(updatedMap.equivalent_tokens),
      ],
    };

    let payload = {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        previous_base_token: previousBaseToken,
        updated_map: mapToUpdate,
      },
    };

    axios
      .put(configs.seetmMapsEndpoint, payload.data, payload.headers)
      .then(
        function (response) {
          console.log(response);
          if (response.data.status !== undefined) {
            if (response.data.status === "success") {
              this.setState({
                snackbarMessage: `Token map updated successfully!`,
                snackbarType: "success",
                snackbarIsOpen: true,
                deleteInProgress: false,
                maps: response.data?.maps || {},
              });
            } else {
              throw new Error("Unexpected error");
            }
          } else {
            throw new Error("Unexpected response");
          }
        }.bind(this)
      )
      .catch(
        function (error) {
          console.log(error);
          this.setState({
            snackbarMessage: "Failed to update the selected map",
            snackbarType: "error",
            snackbarIsOpen: true,
            deleteInProgress: false,
          });
        }.bind(this)
      );
  }

  saveMap(map) {
    this.setState({
      snackbarIsOpen: false,
    });

    if (map?.equivalent_tokens.length === 0) {
      this.setState({
        snackbarIsOpen: true,
        snackbarMessage: "List of equivalent tokens cannot be empty",
        snackbarType: "error",
      });
    } else {
      const mapToAdd = {
        [`${map.base_token}`]: [
          map.base_token,
          ...Object.values(map.equivalent_tokens),
        ],
      };
      this.syncMaps(mapToAdd);
    }
  }

  syncMaps(mapToAdd, callback) {
    let payload = {
      map: mapToAdd,
      headers: { "Content-Type": "application/json" },
    };

    console.log("payload", payload);

    this.setState({
      syncInProgress: true,
      snackbarIsOpen: false,
    });

    axios
      .post(configs.seetmMapsEndpoint, payload)
      .then(
        function (response) {
          console.log(response);
          if (response.data.status !== undefined) {
            if (response.data.status === "success") {
              this.setState({
                snackbarMessage: "Token maps are up-to-date",
                snackbarType: "success",
                snackbarIsOpen: true,
                syncInProgress: false,
                maps: response.data?.maps || {},
              });
            } else {
              throw new Error("Unexpected error");
            }
          } else {
            throw new Error("Unexpected response");
          }
        }.bind(this)
      )
      .catch(
        function (error) {
          console.log(error);

          this.setState({
            snackbarMessage: "Syncing failed!",
            snackbarType: "error",
            snackbarIsOpen: true,
            syncInProgress: false,
          });
        }.bind(this)
      );
  }

  deleteMap(event, baseToken) {
    this.setState({
      deleteInProgress: true,
    });
    console.log("delete called " + baseToken);

    let payload = {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        base_token: baseToken,
      },
    };
    axios
      .delete(configs.seetmMapsEndpoint, payload)
      .then(
        function (response) {
          console.log(response);
          if (response.data.status !== undefined) {
            if (response.data.status === "success") {
              this.setState({
                snackbarMessage: `Token map for ${baseToken} deleted successfully!`,
                snackbarType: "success",
                snackbarIsOpen: true,
                deleteInProgress: false,
                maps: response.data?.maps || {},
              });
            } else {
              throw new Error("Unexpected error");
            }
          } else {
            throw new Error("Unexpected response");
          }
        }.bind(this)
      )
      .catch(
        function (error) {
          console.log(error);
          this.setState({
            snackbarMessage: "Failed to delete the selected map",
            snackbarType: "error",
            snackbarIsOpen: true,
            deleteInProgress: false,
          });
        }.bind(this)
      );
  }

  triggerSnack(message, type) {
    this.setState({
      snackbarMessage: String(message),
      snackbarType: String(type),
      snackbarIsOpen: true,
    });
  }

  fetchMaps(event) {
    this.setState({
      fetchingMapsInProgress: true,
      snackbarIsOpen: false,
    });

    let payload = {
      responseType: "json",
    };

    axios
      .get(configs.seetmMapsEndpoint, payload)
      .then(
        function (response) {
          console.log(response);
          if (response.data.status !== undefined) {
            if (response.data.status === "success") {
              this.setState({
                fetchingMapsInProgress: false,
                maps: response.data?.maps || {},
                tokens: response.data?.tokens || [],
                snackbarMessage: "Token maps were retrieved",
                snackbarType: "success",
                snackbarIsOpen: true,
              });
            } else {
              throw new Error("Unexpected error");
            }
          } else {
            throw new Error("Unexpected response");
          }
        }.bind(this)
      )
      .catch(
        function (error) {
          console.log(error);
          this.setState({
            fetchingMapsInProgress: false,
            maps: undefined,
            snackbarMessage: "Failed to retrieve the maps",
            snackbarType: "error",
            snackbarIsOpen: true,
          });
        }.bind(this)
      );
  }

  render() {
    return (
      <div className="app-main">
        <Box className="main-section m-0 p-0" id="main-section-dashboard">
          <TokenMappingPageTitle
            fetchingMapsInProgress={this.state.fetchingMapsInProgress}
            fetchMaps={this.fetchMaps}
            showAppNotification={this.props.showAppNotification}
          />
          <TokenMappingPageBanner />
          {this.state.fetchingMapsInProgress ? (
            <Box className="row align-items-md-stretch">
              <Box className="p-3 shadow-sm container-middle container-bg">
                <div
                  className="p-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div style={{ marginRight: "10px" }}>Loading Maps</div>
                  <CircularProgress
                    color="inherit"
                    size="12px"
                    style={{ float: "right" }}
                  />
                </div>
              </Box>
            </Box>
          ) : (
            <>
              <Box className="row align-items-md-stretch">
                <Box className="p-3 shadow-sm container-middle container-bg">
                  <Stack direction="column" spacing={1}>
                    <MapToolbar
                      syncInProgress={this.state.syncInProgress}
                      removeAll={this.removeAll}
                      addMap={this.addMap}
                    />
                    {this.state.addInProgress && (
                      <MapListAddItem
                        tokens={this.state.tokens}
                        maps={this.state.maps}
                        saveMap={this.saveMap}
                        appSinhala={this.props.appSinhala}
                      />
                    )}
                  </Stack>
                </Box>
              </Box>
              <Box className="row align-items-md-stretch">
                <Box className="p-3 pt-1 shadow-sm container-middle container-bg">
                  <Stack direction="column" spacing={1}>
                    <MapList
                      tokens={this.state.tokens}
                      maps={this.state.maps}
                      addMap={this.addMap}
                      updateMap={this.updateMap}
                      deleteMap={this.deleteMap}
                      appSinhala={this.props.appSinhala}
                      triggerSnack={this.triggerSnack}
                    />
                  </Stack>
                </Box>
              </Box>
            </>
          )}
        </Box>
        <Snackbar
          open={this.state.snackbarIsOpen}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          anchorOrigin={{
            vertical: `${configs.snackbarVerticalPosition}`,
            horizontal: `${configs.snackbarHorizontalPostion}`,
          }}
        >
          <Alert
            onClose={this.handleSnackbarClose}
            severity={this.state.snackbarType}
            sx={{ width: "100%" }}
          >
            {this.state.snackbarMessage.toString()}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
