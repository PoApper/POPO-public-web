import React, {Component} from 'react';
import {Container} from "semantic-ui-react";

export default class NotFound extends Component {
  render() {
    return (
      <section>
        <Container textAlign={'center'} style={{padding: "15vh 0"}}>
          <h1>페이지가 존재하지 않습니다.</h1>
          <p>링크를 잘못 입력하셨거나 페이지가 삭제/이동되었을 수 있습니다.</p>
        </Container>
      </section>
    )
  }
}