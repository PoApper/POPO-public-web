import React, {Component} from 'react';
import {Container, Grid, Icon, Image, List} from "semantic-ui-react";
import {Link} from "react-router-dom";
import AnimatedNumber from "animated-number-react";
import Booking_illustration from './booking_illustration.svg';

/**
 * @url: /reservation
 */

export default class ReservationHome extends Component {
  generateAnimatedNumber = (number) => {
    return <AnimatedNumber
      style={{fontFamily: "Caveat"}}
      value={number}
      formatValue={(value) => value.toFixed(0)}/>
  }

  render() {
    return (
      <section style={{marginBottom: "15em"}}>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Container style={{fontSize: "1em"}}>
                <h1 style={{fontFamily: "Caveat", fontStyle: "italic", marginBottom: "1em"}}>
                  <span style={{fontFamily: "Caveat"}}>POPO</span> 에서 <br/>
                  <big>{this.generateAnimatedNumber(17)}</big> 곳의 장소와 <big>{this.generateAnimatedNumber(35)}</big> 개의 장비를<br/>
                    예약할 수 있습니다!
                </h1>
                <p>
                  <b>POSTECH 총학생회</b>는<br/>
                  학생 복지를 위해 장소를 개방하고 물품을 공유하고 있습니다 🙌
                </p>
                <List as='ol'>
                  <List.Item as='li' value='-'>
                    장소 예약하기 <Link to={"/reservation/place"}><Icon name={'linkify'}/></Link>
                  </List.Item>
                  <List.Item as='li' value='-'>
                    장비 대여하기 <Link to={"/reservation/equip"}><Icon name={'linkify'}/></Link>
                  </List.Item>
                </List>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Image centered src={Booking_illustration} size={"medium"}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    )
  }
}