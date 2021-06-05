import React, {Component} from 'react';
import {Dimmer, Label, Loader, Table} from "semantic-ui-react";
import {convertDate, convertTime, convertStatus} from "../../utils";

export default class PlaceReservationTable extends Component {
  render() {
    return (
      <Table compact>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>사용자</Table.HeaderCell>
            <Table.HeaderCell>예약 제목</Table.HeaderCell>
            <Table.HeaderCell>예약 기간</Table.HeaderCell>
            <Table.HeaderCell>상태</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.reservations ?
            (this.props.reservations.length !== 0 ?
              this.props.reservations.map(reservation => {
                return <Table.Row textAlign='center'>
                  <Table.Cell>{reservation.user}</Table.Cell>
                  <Table.Cell>{reservation.title}</Table.Cell>
                  <Table.Cell>
                    {convertDate(reservation.date)}<br/>
                    {convertTime(reservation.startTime)} ~ {convertTime(reservation.endTime)}
                  </Table.Cell>
                  <Table.Cell>{convertStatus(reservation.reserveStatus)}</Table.Cell>
                </Table.Row>
              })
              : <Table.Row>
                <Table.Cell/>
                <Table.Cell>등록된 예약이 없습니다!</Table.Cell>
                <Table.Cell/>
                <Table.Cell/>
              </Table.Row>)
            : <Dimmer active inverted>
              <Loader content='Loading'/>
            </Dimmer>
          }
        </Table.Body>
      </Table>
    )
  }
}

