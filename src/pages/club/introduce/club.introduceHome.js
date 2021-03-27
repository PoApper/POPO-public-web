import React, {Component} from 'react';
import {Image, Grid, Card} from 'semantic-ui-react'
import Performance1 from './images/performance1.svg'
import Performance2 from './images/performance2.svg'
import HobbyAndExhibition from './images/hobbyAndExhibition.svg'
import Sports from './images/sports.svg'
import Study from './images/study.svg'
import SocietyAndReligion from './images/societyAndReligion.svg'

// URL: /club/introduce

export default class ClubIntroduceHome extends Component {

  render() {
    return (
      <section>
        <Grid stackable style={{marginBottom: "4em", textAlign: "center"}} columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Card href={"/club/introduce/performance1"}>
                <Card.Content style={{height: "12em"}}>
                  <Image src={Performance1} style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
                </Card.Content>
                <Card.Content>
                  <Card.Header>공연1</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card href={"/club/introduce/performance2"}>
                <Card.Content style={{height: "12em"}}>
                  <Image src={Performance2} style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
                </Card.Content>
                <Card.Content>
                  <Card.Header>공연2</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card href={"/club/introduce/sports"}>
                <Card.Content style={{height: "12em"}}>
                  <Image src={Sports} style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
                </Card.Content>
                <Card.Content>
                  <Card.Header>체육</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card href={"/club/introduce/hobbyAndExhibition"}>
                <Card.Content style={{height: "12em"}}>
                  <Image src={HobbyAndExhibition} style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
                </Card.Content>
                <Card.Content>
                  <Card.Header>취미전시</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card href={"/club/introduce/study"}>
                <Card.Content style={{height: "12em"}}>
                  <Image src={Study} style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
                </Card.Content>
                <Card.Content>
                  <Card.Header>학술</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card href={"/club/introduce/societyAndReligion"}>
                <Card.Content style={{height: "12em"}}>
                  <Image src={SocietyAndReligion} style={{height: "100%", width: "100%", verticalAlign: "middle"}}/>
                </Card.Content>
                <Card.Content>
                  <Card.Header>사회종교</Card.Header>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    )
  }

}