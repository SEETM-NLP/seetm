import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import MapListItem from "../pageContent/MapListItem";

export default class MapList extends Component {
  render() {
    return Object.keys(this.props.maps).map((baseToken, index) => {
      return (
        <MapListItem
          key={`${uuidv4()}${baseToken}${index}`}
          index={index}
          baseToken={baseToken}
          tokenMap={this.props.maps[baseToken].filter(
            (token) => token !== baseToken
          )}
          maps={this.props.maps}
          tokens={this.props.tokens}
          appSinhala={this.props.appSinhala}
          addMap={this.props.addMap}
          updateMap={this.props.updateMap}
          deleteMap={this.props.deleteMap}
          triggerSnack={this.props.triggerSnack}
        />
      );
    });
  }
}
