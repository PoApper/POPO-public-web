import React, {Component} from 'react';
import axios from "axios";
import {Grid, Image, Container} from "semantic-ui-react";

// URL: /club/introduce/:clubType

export default class ClubIntroduceClubType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intros: [],
    }
  }

  async componentDidMount() {
    const existIntros = await axios.get(`${process.env.REACT_APP_API_URL}/introduce/club/clubType/${this.props.match.params.clubType}`);
    this.setState({intros: existIntros.data})
  }

  genGrid = (num_col) => {
    // grid를 생성할 때, `num_col`의 배수로 맞춰주려고 일부러 `null`을 삽입함.
    for (let i = 0; i < this.state.intros.length % num_col; i++) {
      this.state.intros.push(null)
    }

    // 1차원 배열 `this.state.intros`를 2차원 배열 `intros`로 변환
    let intros = [];
    for (let i = 0; i < this.state.intros.length; i += num_col) {
      intros.push(this.state.intros.slice(i, i + num_col));
    }

    return intros.map((inner_intros, idx) => {
      return (
        <Grid.Row columns='equal'>
          {
            inner_intros.map((_intro, idx) => {
              return (
                <Grid.Column>
                  {
                    _intro ?
                      <div>
                        <Container style={{width: "12em", lineHeight: "12em"}}>
                          <Image href={`/club/introduce/${this.props.match.params.clubType}/${_intro.name}`} centered style={{verticalAlign: "middle"}}
                                 src={(_intro.logoName) ?
                                   `${process.env.REACT_APP_API_URL}/introduce/club/image/${_intro.logoName}` :
                                   'https://react.semantic-ui.com/images/wireframe/image.png'}/>
                        </Container>
                        <h4 style={{margin: "5px 0 0"}}>{_intro.name}</h4>
                        <p style={{color: 'gray'}}>{_intro.short_desc}</p>
                      </div> : null
                  }
                </Grid.Column>
              )
            })
          }
        </Grid.Row>
      )
    })
  }


  render() {
    return (
      <div>
        <Grid textAlign='center' stackable>
          {
            this.genGrid(4)
          }
        </Grid>
      </div>
    )
  }
}