import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {Form, Message, Button, Container} from "semantic-ui-react";

import './signup.css';

const userTypeOptions = [
  {key: 'STUDENT', text: '학생 (학부/대학원)', value: 'STUDENT'},
  {key: 'STAFF', text: '교직원', value: 'FACULTY'},
  {key: 'OTHERS', text: 'OTHERS', value: 'OTHERS'},
]

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordConfirm: false,
      isValidRangePW: false,
      isValidID: false,
      userType: ''
    }
  }

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    })
  }

  handleEmailChange = (e, data) => {
    this.setState({
      'email': data.value
    })

    this.setState({
      isValidEmail: RegExp(/^(?=.*[a-zA-z])[a-zA-Z0-9]{4,20}@postech.ac.kr$/).test(data.value) // check only postech email format
      // isValidEmail: RegExp( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/).test(data.value) // check all email format
    })
  }

  handleIDChange = (e, data) => {
    this.setState({
      'id': data.value
    })
    this.setState({
      isValidID: RegExp(/^(?=.*[a-zA-z])[a-zA-Z0-9]{4,20}$/).test(data.value)
    })
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
    if (!this.state.isValidID || !this.state.isPasswordConfirm || !this.state.isValidEmail) {
      alert("유효한 값을 입력해주세요! 😱");
      return;
    }
    try {
      axios.post(`${process.env.REACT_APP_API_URL}/auth/signIn`, {
        'email': this.state.email,
        'id': this.state.id,
        'password': this.state.password,
        'name': this.state.name,
        'userType': this.state.userType
      }, {withCredentials: true});
      alert("회원가입에 성공했습니다! 😁\nPOPO 가입 메일을 확인해주세요! 📧\n(1분 정도 지연 될 수 있습니다.)");
      this.props.history.push('/login')
    } catch (err) {
      const response = err.response;
      alert(`회원가입에 실패했습니다. 😢\n"${response.data.message}"`);
    }
  }

  render() {
    return (
      <Container id={"signUp"} style={{padding: "3vh 3vw", margin: "1em 0 4em", backgroundColor: "#eeeeee"}}>
        <Form autoComplete="off">
          <Form.Input required
                      label='email' name='email'
                      onChange={this.handleEmailChange}
                      placeholder='POSTECH Mail만 가입 가능합니다.'
                      error={(this.state.isValidEmail || !this.state.email) ? null : {
                        content: "유효하지 않은 이메일 형식입니다.",
                        pointing: 'below'
                      }}
          />
          <p>이 이메일로 인증메일이 발송됩니다!</p>
          <Form.Input required
                      label='ID' name='id'
                      onChange={this.handleIDChange}
                      placeholder='ID'
                      error={(this.state.isValidID || !this.state.id) ? null : {
                        content: "5~20자의 영문 소문자, 숫자만 사용 가능합니다.",
                        pointing: 'below'
                      }}
          />
          <Form.Group>
            <Form.Input required type='password' width={8}
                        label='Password' name='password'
                        onChange={this.handlePWChange}
                        placeholder='8자리 이상 16자리 이하'
                        error={(this.state.isValidRangePW || !this.state.password) ? null: {
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
          <Form.Input required
                      label='이름' name='name'
                      onChange={this.handleChange}
          />
          <Form.Select required options={userTypeOptions}
                       label={'유저 타입'} name='userType'
                       onChange={this.handleChange}
                       placeholder='유저 타입을 선택하세요.'
          />
          {this.state.userType && this.state.userType !== 'STUDENT' ?
            <Message color='yellow'>
              <Message.Header>적절한 유저 타입을 선택했나요?</Message.Header>
              <p>유저 정보가 올바르지 않으면 서비스 이용에 불이익이 있을 수 있습니다.</p>
            </Message> : null}
          <Form.Checkbox label={<label><Link to={"privacy-policy"}>개인정보처리방침</Link>에 동의합니다.</label>}/>
          <Button primary onClick={this.handleSubmit}>가입하기</Button>
        </Form>
      </Container>
    )
  }
}