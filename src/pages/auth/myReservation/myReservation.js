import React, {Component} from 'react';
import {Button, Container, Form, Segment} from "semantic-ui-react";
import axios from "axios";
import moment from "moment";

export default class MyReservation extends Component {

  // async componentDidMount() {
  //   try {
  //     const myReservations = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/auth/myReservation`, {withCredentials: true});
  //     console.log(myReservations.data)
  //     this.setState({
  //       myInfo: myReservations.data
  //     })
  //   } catch (err) {
  //     console.log("내 정보를 불러오는데 실패했습니다 😥");
  //   }
  // }

  render() {
    return (
      <Container style={{padding: "3vh 3vw", margin: "2em 0 2em", backgroundColor: "#eeeeee"}}>
        <h2>내 예약</h2>
        <h3>장소 예약</h3>
        <p>서비스 준비중입니다! 🤩</p>
        <h3>장비 예약</h3>
        <p>서비스 준비중입니다! 🤩</p>
      </Container>
    )
  }
}