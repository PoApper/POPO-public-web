import React, {Component} from 'react';
import {Image, Grid, Card} from 'semantic-ui-react'
import dongyeon_img from './images/dongyeon.png';
import dormUnion_img from './images/dormUnion.png';
import saengna_img from './images/saengna.jpg'

export default class EquipHome extends Component {
  render() {
    return (
      <div>
        <Grid stackable>
          <Grid.Row centered columns={3}>
            <Grid.Column>
              <Card href={"/reservation/equip/dongyeon"} centered >
                <Image src={dongyeon_img} wrapped ui={false} style={{backgroundColor: 'white'}}/>
                <Card.Content>
                  <Card.Header>동아리연합회</Card.Header>
                  <Card.Meta>Student Club Union</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card href={"/reservation/equip/dormUnion"} centered>
                <Image src={dormUnion_img} wrapped ui={true} style={{backgroundColor: 'white'}}/>
                <Card.Content>
                  <Card.Header>생활관자치회</Card.Header>
                  <Card.Meta>Dormitory Union</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card href={"/reservation/equip/saengna"} centered>
                <Image src={saengna_img} wrapped ui={true} style={{backgroundColor: 'white'}}/>
                <Card.Content>
                  <Card.Header>생각나눔</Card.Header>
                  <Card.Meta>Committee Advisory Council</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }

}