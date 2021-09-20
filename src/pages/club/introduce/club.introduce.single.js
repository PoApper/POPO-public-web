import React, {Component} from 'react';
import axios from "axios";
import {Grid, Image, Container, Icon, Popup} from "semantic-ui-react";


export default class ClubIntroduceSingle extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.match.params;
    this.state = {
      intro: {}
    }
  }

  async componentDidMount() {
    const existIntro = await axios.get(`${process.env.REACT_APP_API_URL}/introduce/club/name/${this.params.name}`);
    // support new line
    existIntro.data.content = existIntro.data.content.split('\n').map(str => <p>{str}</p>);
    this.setState({
      intro: existIntro.data
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              <h1 style={{margin: "0"}}>{this.params.name}</h1>
              <h3 style={{margin: "0 0 10px", color: 'gray'}}>{this.state.intro.short_desc}</h3>

              <Container>
                {this.state.intro.content}
              </Container>
              <br/>
              <Container>
                <p>
                  <b>동방 위치</b>: {this.state.intro.location}
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
                       `${process.env.REACT_APP_API_URL}/introduce/club/image/${this.state.intro.logoName}` :
                       'https://react.semantic-ui.com/images/wireframe/image.png'}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}