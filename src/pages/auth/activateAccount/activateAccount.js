import React, {Component} from 'react';
import {Button, Container} from "semantic-ui-react";
import axios from "axios";

export default class ActivateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidAccount: false
    }
  }

  async componentDidMount() {
    try {
      const {params} = this.props.match;
      console.log(await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/activate/${params.uuid}`, {withCredentials: true}))
      console.log("alskdnflksndfs");
      this.setState({
        isValidAccount: true
      })
    } catch (err) {
      alert("올바르지 않은 접근입니다 ⚠");
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <section>
        {
          this.state.isValidAccount ?
            <div>
              <h2>계정이 활성 되었습니다!</h2>
              <Container>
                POSTECH 총학생회에서 운영하는 POPO는 학생 복지와 편의를 제공합니다.<br/>
                POPO에서 여러 기능들을 사용해보세요!
              </Container>
              <br/>
              <Button primary href={"/login"}>
                로그인 하러 가기
              </Button>
            </div> :
            <div>
              <h2>올바르지 않는 접근입니다.</h2>
            </div>
        }
      </section>
    )
  }
}