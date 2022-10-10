import React from "react";
import { Link } from "react-router-dom";
import seetm from "./seetm_light.png";
import VersionModal from "../modal/VersionModal";
import { configs } from "../../configs";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTheme = this.handleTheme.bind(this);
  }

  handleTheme(event) {
    this.props.handleAppTheme();
  }

  render() {
    return (
      <>
        <div id="mySidebar" className="sidebar sidebar-dark">
          <div className="container sidebar-logo-container">
            <div className="row">
              <div className="span4"></div>
              <div className="span4 text-center">
                <img
                  className="center-block sidebar-logo"
                  src={seetm}
                  alt=""
                  role={"button"}
                  data-bs-toggle="modal"
                  data-bs-target={`#seetm-version-modal`}
                />
              </div>
              <div className="span4"></div>
            </div>
          </div>
          <div
            className={`app-sidebar-link ${
              this.props.activeLink === "seetm" && "app-sidebar-link-active"
            }`}
          >
            <Link
              to="/"
              className={`sidebar-link ripple-button`}
              id="sidebar-dash"
            >
              <span className="material-icons material-sidebar-icon">
                code {/* zoom_in_map */}
              </span>
              <span className="icon-text">Token Mapping</span>
            </Link>
          </div>
          <br />
          <div className="app-sidebar-link">
            <label
              htmlFor="dark-mode-switch"
              className="sidebar-link ripple-button"
              id="sidebar-dark-mode"
              onClick={this.handleTheme}
            >
              <span
                className="material-icons material-sidebar-icon"
                id="sidebar-dark-mode-icon"
              >
                dark_mode
              </span>
              <span className="icon-text">Dark Mode</span>
            </label>
          </div>
        </div>
        <VersionModal
          version={this.props?.appVersion}
          docs={`${configs.seetmDocsHost}`}
          github={`${configs.seetmGitHub}`}
        />
      </>
    );
  }
}

export default Sidebar;
