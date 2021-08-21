import React, {Component} from 'react';
import {Container} from "semantic-ui-react";

export default class ServiceReady extends Component {
  render() {
    return (
      <section>
        <Container textAlign={'center'} style={{padding: "15vh 0"}}>
          <h1>서비스 준비중입니다 🤩</h1>
          <p>POPO에 추가할 좋은 아디이어가 있다면 제안해주세요!</p>
        </Container>
      </section>
    )
  }
}