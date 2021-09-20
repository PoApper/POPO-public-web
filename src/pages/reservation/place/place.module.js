import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import PlaceHome from "./placeHome";
import PlaceList from "./placeList";
import PlaceReservation from "./placeReservation";

/**
 * @url: /reservation/place
 */


export default class PlaceModule extends Component {
  render() {
    return (
      <div style={{width: "100%"}}>
        <Switch>
          <Route exact path={"/reservation/place"} component={PlaceHome}/>
          <Route exact path={"/reservation/place/:region"} component={PlaceList}/>
          <Route exact path={"/reservation/place/:region/:placeName"} component={PlaceReservation}/>
        </Switch>
      </div>
    )
  }
}