import React, {Component} from 'react';
import { Container, Form, Segment} from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import './myInfo.css';

export default class MyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myInfo: null
    }
  }

  async componentDidMount() {
    try {
      const myInfo = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/myInfo`, {withCredentials: true});
      console.log(myInfo.data)
      this.setState({
        myInfo: myInfo.data // { "id": ..., "name": ..., "email": ... }
      })
    } catch (err) {
      console.log("내 정보를 불러오는데 실패했습니다 😥");
    }
  }

  handlePWChange = (e, data) => {
    this.handleConfirmPassword(e, data);
    this.setState({
      isValidRangePW: RegExp(/^(\w{8,16})$/).test(data.value)
    });
  }

  handleConfirmPassword = (e, data) => {
    this.setState({
      [data.name]: data.value
    }, () => {
      const {password, rePassword} = this.state;

      if (data.value) {
        this.setState({
          isPasswordConfirm: password === rePassword
        })
      }
    })
  }

  handleSubmit = async (e) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/auth/updatePW`, {
        'password': this.state.password
      }, {withCredentials: true})
      alert('비밀번호 변경에 성공했습니다!');
      window.location.reload();
    } catch (err) {
      const response = err.response;
      alert(`비밀번호 업데이트에 실패했습니다. 😢\n"${response.data.message}"`);
    }
  }

  render() {
    return (
      <Container id='myInfo' style={{padding: "3vh 3vw", margin: "2em 0 4em", backgroundColor: "#eeeeee"}}>
        <h2>내 정보</h2>
        {this.state.myInfo ?
          <Segment.Group>
            <Segment>
              <h4>email</h4>
              <Container>
                {this.state.myInfo.email}
              </Container>
            </Segment>
            <Segment>
              <h4>ID</h4>
              <Container>
                {this.state.myInfo.id}
              </Container>
            </Segment>
            <Segment>
              <h4>비밀번호 수정하기</h4>
              <Form stackable>
                <Form.Group style={{marginBottom: "8px"}}>
                  <Form.Input required type='password' width={8}
                              label='Password' name='password'
                              onChange={this.handlePWChange}
                              placeholder='8자리 이상 16자리 이하'
                              error={(this.state.isValidRangePW || !this.state.password) ? null : {
                                content: '비밀번호가 너무 짧습니다.',
                                pointing: 'above'
                              }}
                  />
                  <Form.Input required type='password' width={8}
                              label='Password 확인' name='rePassword'
                              onChange={this.handleConfirmPassword}
                              error={((this.state.isPasswordConfirm && this.state.password) || !this.state.rePassword) ? null : {
                                content: '비밀번호가 일치하지 않습니다.',
                                pointing: 'above'
                              }}
                  />
                </Form.Group>
                <Form.Button primary size='mini' onClick={this.handleSubmit}>비밀번호 수정</Form.Button>
              </Form>
            </Segment>
            <Segment>
              <h4>이름</h4>
              <Container>
                {this.state.myInfo.name}
              </Container>
            </Segment>
            <Segment>
              <h4>유저 타입</h4>
              <Container>
                {this.state.myInfo.userType}
              </Container>
            </Segment>
            <Segment>
              <h4>가입일</h4>
              <Container>
                {moment(this.state.myInfo.createdAt).format('YYYY.MM.DD HH:mm')}
              </Container>
            </Segment>
          </Segment.Group> : null
        }

      </Container>)
  }
}