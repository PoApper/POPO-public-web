import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import EquipHome from "./equip.home";
import EquipList from "./equip.list";
import EquipListDormUnion from "./equip.list.dormUnion";

/**
 * @url: /reservation/equip
 */

export default class EquipModule extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={"/reservation/equip"} component={EquipHome}/>
          <Route exact path={"/reservation/equip/dormUnion"} component={EquipListDormUnion}/>
          <Route exact path={"/reservation/equip/:owner"} component={EquipList}/>
        </Switch>
      </div>
    )
  }
}