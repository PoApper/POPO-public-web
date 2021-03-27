import React, {Component} from 'react';
import axios from "axios";
import {Grid, Image, Container, Icon, Popup} from "semantic-ui-react";


export default class AssociationIntroduceSingle extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.match.params;
    this.state = {
      isLoaded: false,
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/introduce/association/name/${this.params.name}`);
      const intro = response.data;
      intro.content = intro.content.split('\n').map(str => <p>{str}</p>); // support new line
      this.setState({
        isLoaded: true,
        intro: intro
      });
    } catch (e) {
      alert("소개글을 불러오는데 실패했습니다.");
    }
  }

  render() {
    return (
      <section>{
        this.state.isLoaded ?
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={10}>
                <h1>{this.params.name}</h1>
                <Container>
                  {this.state.intro.content}
                </Container>
                <br/>
                <Container>
                  <p>
                    <b>사무실 위치</b>: {this.state.intro.location}
                  </p>
                  <p>
                    <b>대표자</b>: {this.state.intro.representative} &nbsp;
                    <Popup content={this.state.intro.contact} trigger={<Icon name={'mail'}/>}/>
                  </p>
                </Container>
              </Grid.Column>
              <Grid.Column width={6}>
                <Image centered size='small'
                       src={(this.state.intro.logoName) ?
                         `${process.env.REACT_APP_API_URL}/introduce/association/image/${this.state.intro.logoName}` :
                         'https://react.semantic-ui.com/images/wireframe/image.png'}/>
              </Grid.Column>
            </Grid.Row>
          </Grid> : null
      }</section>
    )
  }
}