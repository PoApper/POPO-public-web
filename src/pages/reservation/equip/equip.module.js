import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import EquipHome from "./equip.home";
import EquipReservation from './equip.reservation'

/**
 * @url: /reservation/equip
 */

export default class EquipModule extends Component {
  render() {
    return (
      <div style={{width: "100%"}}>
        <Switch>
          <Route exact path={"/reservation/equip"} component={EquipHome}/>
          <Route exact path={"/reservation/equip/:owner"} component={EquipReservation}/>
        </Switch>
      </div>
    )
  }
}