import React, {Component} from 'react';
import axios from "axios";
import {Grid, Image} from "semantic-ui-react";
import styled from 'styled-components'

export default class AssociationIntroduce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/introduce/association`);
      this.setState({
        isLoaded: true,
        intros: response.data
      });
    } catch (e) {
      alert("소개글을 불러오는데 실패했습니다.");
    }
  }

  /**
   * A function for generate grid
   */
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
        <Grid.Row columns='equal' key={idx}>
          {inner_intros.map((_intro, idx) => {
            return (
              <Grid.Column key={idx}>
                {
                  _intro ?
                    <div>
                      <Image href={`/association/introduce/${_intro.name}`} centered size='small'
                             src={(_intro.logoName) ?
                               `${process.env.REACT_APP_API_URL}/introduce/association/image/${_intro.logoName}` :
                               'https://react.semantic-ui.com/images/wireframe/image.png'}/>
                      <AssociationName>{_intro.name}</AssociationName>
                    </div> : null
                }
              </Grid.Column>
            )
          })}
        </Grid.Row>
      )
    })
  }

  render() {
    return (
      <div>{
        this.state.isLoaded ?
          <Grid textAlign='center' stackable>
            {this.genGrid(4)}
          </Grid> : null
      }</div>
    )
  }
}

const AssociationName = styled.h3`
  word-break: keep-all;
`