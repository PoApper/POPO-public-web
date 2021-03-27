import React, {Component} from 'react';
import {Button, Container, Form, List} from "semantic-ui-react";
import axios from "axios";

import "./login.css";

export default class Login extends Component {
  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    });
  }

  async componentDidMount() {
    try {
      const verifiedUser = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/verifyToken`, {withCredentials: true});
      if (verifiedUser) {
        alert("이미 로그인 되었습니다.");
        this.props.history.push('/')
      }
    } catch (err) {
      // console.clear();
    }
  }

  handleLogin = async (e) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        id: this.state.id,
        password: this.state.password
      }, {withCredentials: true}) // `withCredentials`을 true로 설정해야 브라우저에서 JWT 쿠키를 생성할 수 있음.
      this.props.history.push('/');
      window.location.reload();
    } catch (err) {
      const response = err.response;
      alert(`⚠ 등록되지 않은 ID/PW 입니다. ⚠\n"${response.data.message}"`);
    }
  }

  render() {
    return (
      <Container id={"login"} style={{padding: "3vh 3vw", margin: "2em 0 4em", backgroundColor: "#eeeeee"}}>
        <Form>
          <Form.Input label={'아이디'} name={'id'}
                      onChange={this.handleChange}/>
          <Form.Input label={'비밀번호'} name={'password'} type="password"
                      onChange={this.handleChange}/>
          <Button primary onClick={this.handleLogin}>로그인</Button>
        </Form>
        <List horizontal divided link size='small'>
          <List.Item as='a' href='find/id' content={"아이디 찾기"}/>
          <List.Item as='a' href='find/password' content={"비밀번호 찾기"}/>
          <List.Item as='a' href='/signup' content={"회원가입"}/>
        </List>
      </Container>
    )
  }
}