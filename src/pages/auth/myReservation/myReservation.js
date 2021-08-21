import React, {Component} from 'react';
import { Container, Label, Table } from 'semantic-ui-react'
import axios from "axios";
import moment from "moment";
import {convertDate, convertTime, convertStatus} from "../../../utils";

export default class MyReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/reservation-place/user`, {withCredentials: true});
      this.setState({
        isLoaded: true,
        reservations: response.data
      })
    } catch (err) {
      console.log("내 예약을 불러오는데 실패했습니다 😥");
    }
  }

  render() {
    return (
      <Container style={{padding: "3vh 3vw", margin: "2em 0 2em", backgroundColor: "#eeeeee"}}>
        <h2>내 예약</h2>
        <h3>장소 예약</h3>
        {
          this.state.isLoaded ?
            <Table compact>
              <Table.Header>
                <Table.Row textAlign='center'>
                  <Table.HeaderCell width={1}>idx.</Table.HeaderCell>
                  <Table.HeaderCell>예약 제목</Table.HeaderCell>
                  <Table.HeaderCell width={3}>예약 기간</Table.HeaderCell>
                  <Table.HeaderCell width={1}>상태</Table.HeaderCell>
                  <Table.HeaderCell width={3}>생성일</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  this.state.reservations.map((reservation, idx) => {
                    return <Table.Row textAlign='center'>
                      <Table.Cell>{idx + 1}</Table.Cell>
                      <Table.Cell>{reservation.title}</Table.Cell>
                      <Table.Cell>
                        {convertDate(reservation.date)}<br/>
                        {convertTime(reservation.startTime)} ~ {convertTime(reservation.endTime)}
                      </Table.Cell>
                      <Table.Cell>
                        <Label circular empty color={convertStatus(reservation.reserveStatus)}/>
                      </Table.Cell>
                      <Table.Cell>{moment(new Date(reservation.createdAt)).format('YYYY.MM.DD')}</Table.Cell>
                    </Table.Row>
                  })
                }
              </Table.Body>
            </Table> : <p>서비스 준비중입니다! 🤩</p>
        }
        <h3>장비 예약</h3>
        <p>서비스 준비중입니다! 🤩</p>
      </Container>
    )
  }

}