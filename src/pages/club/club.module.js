import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import ClubIntroduceHome from "./introduce/club.introduceHome";
import ClubIntroduceClubType from "./introduce/club.introduce.clubType";
import ClubIntroduceSingle from "./introduce/club.introduce.single";
import ServiceReady from "../others/ServiceReady";

/**
 * @url: /club
 */

export default class ClubModule extends Component {
  render() {
    return (
      <div style={{width: "100%"}}>
        <Switch>
          <Route exact path={"/club"} component={ClubIntroduceHome}/>
          <Route exact path={"/club/introduce"} component={ClubIntroduceHome}/>
          <Route exact path={"/club/introduce/:clubType"} component={ClubIntroduceClubType}/>
          <Route exact path={"/club/introduce/:clubType/:name"} component={ClubIntroduceSingle}/>
          <Route component={ServiceReady}/>
        </Switch>
      </div>
    )
  }
}