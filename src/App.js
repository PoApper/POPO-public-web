import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css'
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./pages/auth/login/login";
import Signup from "./pages/auth/signup/signup";
import PrivacyPolicy from "./pages/others/PrivacyPolicy/PrivacyPolicy";
import SectionHome from "./pages/sectionHome/sectionHome";
import ReservationHome from "./pages/reservation/home/reservationHome";
import ServiceReady from "./pages/others/ServiceReady/ServiceReady";
import DevelopInfo from "./pages/others/developInfo/developInfo";
import MyInfo from "./pages/auth/myInfo/myInfo";
import ActivateAccount from "./pages/auth/activateAccount/activateAccount";
import MyReservation from "./pages/auth/myReservation/myReservation";
import AssociationModule from "./pages/association/association.module";
import ClubModule from "./pages/club/club.module";
import {Container} from "semantic-ui-react";
import EquipModule from "./pages/reservation/equip/equip.module";
import PlaceModule from "./pages/reservation/place/place.module";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Container style={{margin: "5em 0 1em", padding: "2em 0"}}>
            <Switch>
              <Route exact path={"/"} component={SectionHome}/>
              <Route exact path={"/login"} component={Login}/>
              <Route exact path={"/signup"} component={Signup}/>
              <Route exact path={"/privacy-policy"} component={PrivacyPolicy}/>
              <Route exact path={"/reservation"} component={ReservationHome}/>
              <Route path={"/reservation/place"} component={PlaceModule}/>
              <Route path={"/reservation/equip"} component={EquipModule}/>
              <Route path={"/association"} component={AssociationModule}/>
              <Route path={"/club"} component={ClubModule}/>
              <Route exact path={"/recruit-developer"} component={DevelopInfo}/>
              <Route exact path={"/myInfo"} component={MyInfo}/>
              <Route exact path={"/myReservation"} component={MyReservation}/>
              <Route exact path={"/activateAccount/:uuid"} component={ActivateAccount}/>
              <Route component={ServiceReady}/>
            </Switch>
        </Container>
        <div style={{padding: "0 10vw 2vh"}}>
          <Footer/>
        </div>
      </div>
    )
  }

}
