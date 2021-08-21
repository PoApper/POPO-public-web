import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Container, Grid, Icon, Image} from "semantic-ui-react";
import BackImageDay from './home_backgroun_day.jpg';
import BackImageNight from './home_background2_night.jpg';
import TextCarousel from "./react-carousel/textCarousel";
import "pure-react-carousel/dist/react-carousel.es.css";

export default class SectionHome extends Component {
  render() {
    return (
      <Container>
        <div id={"textCarousel"} style={{
          margin: "0 0 1.5rem",
          padding: "3px 4rem",
          border: "1px ridge black",
          backgroundColor: "#474d4e", color: "#FFD12A",
        }}>
          <TextCarousel/>
        </div>
        <div style={{background: "#eeeeee", borderRadius: "0.4em"}}>
          <Grid stackable style={{padding: "1vh 3vw"}}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Container style={{fontSize: "1em"}}>
                  <h1 style={{fontFamily: "Caveat"}}>POPO, POstechian's POrtal</h1>
                  <p>이곳에서 학생회관, 지곡회관 등의 장소를 예약하고, 총학생회에서 보유한 장비들을 대여할 수 있습니다! 📋 <Link to={"/reservation"}><Icon
                    name={'linkify'}/></Link></p>
                  <p>총학생회를 구성하는 자치단체에 대해 살펴볼 수 있습니다! 👀 <Link to={"/association"}><Icon name={'linkify'}/></Link></p>
                  <p>교내 동아리 역시 POPO에서 확인할 수 있습니다! 🎨 <Link to={"/club"}><Icon name={'linkify'}/></Link></p>
                </Container>
              </Grid.Column>
              <Grid.Column>{
                (9 <= (new Date().getHours()) && (new Date().getHours()) <= 18) ?
                  <Image src={BackImageDay} rounded centered width={"100%"}/> :
                  <Image src={BackImageNight} rounded centered width={"100%"}/>
              }</Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Container>
    )
  }

}