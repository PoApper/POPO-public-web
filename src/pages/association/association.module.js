import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import AssociationIntroduce from "./introduce/association.introduce";
import AssociationIntroduceSingle from "./introduce/association.introduce.single";
import ServiceReady from "../others/ServiceReady";

/**
 * @url: /association
 */

export default class AssociationModule extends Component {
  render() {
    return (
      <div style={{padding: "3vh 5vw"}}>
        <Switch>
          <Route exact path={"/association"} component={AssociationIntroduce}/>
          <Route exact path={"/association/introduce"} component={AssociationIntroduce}/>
          <Route exact path={"/association/introduce/:name"} component={AssociationIntroduceSingle}/>
          <Route component={ServiceReady}/>
        </Switch>
      </div>
    )
  }
}