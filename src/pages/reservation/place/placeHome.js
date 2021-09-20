import React, {Component} from 'react';
import {Image, Grid, Card} from 'semantic-ui-react'
import Jigok_img from './images/jigok.jpg';
import StudentHall_img from './images/student_hall.jpg';
import Dormitory_img from './images/dormitory_img.jpg'

export default class PlaceHome extends Component {
  render() {
    return (
      <div>
        <Grid stackable>
          <Grid.Row centered columns={3}>
            <Grid.Column>
              <Card href={"/reservation/place/student-hall"} centered>
                <Image src={StudentHall_img} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>학생회관</Card.Header>
                  <Card.Meta>Student Hall</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card href={"/reservation/place/jigok"} centered>
                <Image src={Jigok_img} wrapped ui={true} />
                <Card.Content>
                  <Card.Header>지곡회관</Card.Header>
                  <Card.Meta>Ji-gok Community Center</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card href={"/reservation/place/others"} centered>
                <Image src={Dormitory_img} wrapped ui={true} />
                <Card.Content>
                  <Card.Header>생활관 외</Card.Header>
                  <Card.Meta>Dormitory, etc.</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}